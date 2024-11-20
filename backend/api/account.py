import hashlib
import uuid
from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from db import db
from models import  Accounts,Users
from test import role_required


def generate_short_uuid():
    uuid_obj = uuid.uuid4()
    uuid_str = uuid_obj.hex
    short_uuid = uuid_str[:8] + uuid_str[8:12] + uuid_str[12:16] + uuid_str[16:20] + uuid_str[20:]
    return short_uuid

# TO CREATE ACCOUNT AND SAVE DETAILS IN USER
class createAccount(Resource):
    @staticmethod
    def hash_password(password):
        md5 = hashlib.md5()
        md5.update(password.encode('utf-8'))
        return md5.hexdigest()
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
    def post(self):
        try:
            data = request.get_json()
            username = data['username']
            _id = generate_short_uuid()
            account_data = Accounts(account_id = _id,
                            police_department_id = data['police_department_id'],
                            first_name = data['first_name'],
                            last_name = data['last_name'],
                            middle_name = data['middle_name'],
                            email_id = data['email_id'],
                            phone_number = data['phone_number'],
                            )
            account_data.saveAccounts()
            user1 = Users(role_id=data['role_id'],account_id = _id,username= username,password =self.hash_password(username))
            user1.save_to_users()
            return jsonify({'status':True,'data':{**data},'msg':'Account Added Successfully'})
        except Exception as e:
            return jsonify({'status':False,'error':str(e),'msg':'Accounts Creation Failed'})

# TO GET ALL ACCOUNTS WITH SEARCH AND PAGINATION 
from sqlalchemy import func

class GetAllAccounts(Resource):
    def post(self):
        try:
            # Parse input data
            data = request.get_json()
            items_per_page = data.get('items_per_page', None)
            page = data.get('page', 1)
            username = data.get('username', None)
            first_name = data.get('first_name', None)
            last_name = data.get('last_name', None)
            police_department_id = data.get('police_department_id', None)
            role_id = data.get('role_id', None)
            email_id = data.get('email_id', None)
            offset = (page - 1) * items_per_page if items_per_page else 0

            # Start building the base query for accounts
            query = Accounts.query

            # Apply filters for Accounts
            if first_name:
                query = query.filter(Accounts.first_name.ilike(f"%{first_name}%"))
            if last_name:
                query = query.filter(Accounts.last_name.ilike(f"%{last_name}%"))
            if email_id:
                query = query.filter(Accounts.email_id.ilike(f"%{email_id}%"))
            if police_department_id:
                query = query.filter(Accounts.police_department_id.ilike(f"%{police_department_id}%"))

            # Join with Users and apply filters
            if username or role_id:
                query = query.join(Users, Users.account_id == Accounts.account_id)
                if username:
                    # Use func.lower() for case-insensitive username search
                    query = query.filter(func.lower(Users.username).contains(username.lower()))
                if role_id:
                    query = query.filter(Users.role_id == role_id)

            # Fetch accounts with pagination
            accounts = query.offset(offset).limit(items_per_page).all() if items_per_page else query.all()

            # Build results
            result = []
            for account in accounts:
                users = Users.query.filter_by(account_id=account.account_id).all()
                users_info = []
                for user in users:
                    if username and username.lower() not in user.username.lower():
                        continue
                    if role_id and role_id != user.role_id:
                        continue
                    users_info.append({
                        'username': user.username,
                        'role_id': user.role_id,
                        'is_enable': user.is_enable
                    })
                if not users_info and (username or role_id):
                    continue  # Skip accounts with no matching users

                payload = {
                    'account_id': account.account_id,
                    'first_name': account.first_name,
                    'last_name': account.last_name,
                    'middle_name': account.middle_name,
                    'email_id': account.email_id,
                    'phone_number': account.phone_number,
                    'police_department_id': account.police_department_id,
                    'username': users_info[0]['username'] if users_info else None,
                    'role_id': users_info[0]['role_id'] if users_info else None,
                    'is_enable': users_info[0]['is_enable'] if users_info else None,
                    'status': account.status
                }
                result.append(payload)

            # Calculate total count of filtered accounts
            count = query.count()

            return {'data': result, 'status': True, 'count': count}

        except Exception as e:
            return {'message': 'An error occurred', 'error': str(e)}



# GET ACCOUNTS BY ID 
class getAccountsById(Resource):
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
    def get(self,uuid):
        try:
            data = Accounts.query.filter_by(account_id = (uuid)).first()
            user = Users.query.filter_by(account_id=uuid).first()
            if data:
                payload = {
                    'account_id':data.account_id,
                        'first_name':data.first_name,
                        'last_name':data.last_name,
                        'middle_name':data.middle_name,
                        'email_id':data.email_id,
                        'phone_number':data.phone_number,
                        'username':user.username,
                        'police_department_id':data.police_department_id,
                        'role':user.role_id
                    }
                return jsonify({'status': True, 'data': payload})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})
    
# UPDATE ACCOUNT DETAILS 
class updateAccount(Resource):
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
    def put(self,uuid):
        try:
            accounts = Accounts.query.filter_by(account_id = (uuid)).first()
            user = Users.query.filter_by(account_id=uuid).first()
            data = request.get_json()
            if accounts:
                accounts.first_name = data['first_name']
                accounts.last_name = data['last_name']
                accounts.middle_name = data['middle_name']
                accounts.email_id = data['email_id']
                accounts.phone_number = data['phone_number']
                accounts.police_department_id = data['police_department_id']
                db.session.commit()
            if user:
                user.username = data['username']
                user.role_id = data['role_id']
                db.session.commit()
            return jsonify({'status': True,'msg':'Updated Account Details', 'data': {**data}})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})
    
# ENABLE DISABLE ACCOUNTS BY ID
class enableDisableAccountById(Resource):
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
    def post(self,uuid):
        try:
            account = Accounts.query.filter_by(account_id=(uuid)).first()
            user = Users.query.filter_by(account_id =(uuid)).first()
            data = request.get_json()
            if account:
                if data['is_enable'] == 0:
                    account.status = data['is_enable']
                    user.is_enable = data ['is_enable']
                    db.session.commit()
                    return jsonify({'status':True,'msg':'Account Disabled Successfully','is_enable':account.status})
                else:
                    account.status = data['is_enable']
                    user.is_enable = data ['is_enable']
                    db.session.commit()
                    return jsonify({'status':True,'msg':'Account Enabled Successfully','is_enable':account.status})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

account_blueprint = Blueprint('account',__name__)
api = Api(account_blueprint)

api.add_resource(createAccount,'/createAccount')
api.add_resource(GetAllAccounts,'/GetAllAccounts')
api.add_resource(getAccountsById,'/getAccountsById/<string:uuid>')
api.add_resource(updateAccount,'/updateAccount/<string:uuid>')
api.add_resource(enableDisableAccountById,'/enableDisableAccountById/<string:uuid>')
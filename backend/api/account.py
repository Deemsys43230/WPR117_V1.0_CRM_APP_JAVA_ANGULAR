import hashlib
import uuid
from flask import Blueprint, jsonify, request
from flask_restful import Api, Resource
from db import db
from models import  Accounts,Users


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
            return jsonify({'status':True,'data':{**data}})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

# TO GET ALL ACCOUNTS WITH SEARCH AND PAGINATION 
class GetAllAccounts(Resource):
    def post(self):
        data = request.get_json()
        items_per_page = data.get('items_per_page', '')
        query_count = Accounts.query.filter_by(status=1).count()
        if items_per_page == "":
            items_per_page = query_count
        try:
            page = data['page']
            username = data.get('username',None)
            first_name = data.get('first_name',None)
            last_name = data.get('last_name',None)
            police_department_id = data.get('police_department_id',None)
            role_id = data.get('role_id',None)
            email_id = data.get('email_id',None)
            offset = (page - 1) * items_per_page
            # Query accounts
            query = Accounts.query.filter_by(status=1)
            if first_name:
                query = query.filter(Accounts.first_name.ilike(f"%{first_name}%"))
            if last_name:
                query = query.filter(Accounts.last_name.ilike(f"%{last_name}%"))
            if email_id:
                query = query.filter(Accounts.email_id.ilike(f"%{email_id}%"))
            if police_department_id:
                query = query.filter(Accounts.police_department_id.ilike(f"%{police_department_id}%"))
            accounts = query.limit(items_per_page).offset(offset).all()
            result = []
            for account in accounts:
                users = Users.query.filter_by(account_id=account.account_id).all()  
                users_info = []
                for user in users:
                    if username and username not in user.username:
                        continue
                    if role_id and role_id != user.role_id:
                        continue
                    users_info.append({
                        'username': user.username,
                        'role_id': user.role_id,
                        'is_enable':user.is_enable
                    })
                if not users_info and (username or role_id):
                    continue 
                payload = {
                    'account_id':account.account_id,
                    'first_name': account.first_name,
                    'last_name': account.last_name,
                    'middle_name': account.middle_name,
                    'email_id': account.email_id,
                    'phone_number': account.phone_number,
                    'police_department_id': account.police_department_id,
                    'username': users_info[0]['username'] if users_info else None,
                    'role_id': users_info[0]['role_id'] if users_info else None,
                    'is_enable': users_info[0]['is_enable'] if users_info else None,
                    'status':account.status
                    }
                result.append(payload)
            return {'data': result, 'status':True,'count': query_count}, 200
        except Exception as e:
            return {'message': 'An error occurred', 'error': str(e)}, 500

# GET ACCOUNTS BY ID 
class getAccountsById(Resource):
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
            return jsonify({'status': True, 'data': {**data}})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})
    
# ENABLE DISABLE ACCOUNTS BY ID
class enableDisableAccountById(Resource):
    def post(self,uuid):
        try:
            account = Accounts.query.filter_by(account_id=(uuid)).first()
            user = Users.query.filter_by(account_id =(uuid)).first()
            data = request.get_json()
            if account:
                if data['is_enabled'] == 0:
                    account.status = data['is_enable']
                    user.is_enable = data ['is_enable']
                    db.session.commit()
                    return jsonify({'status':True,'msg':'Account Disabled Successfully','is_enabled':account.status})
                else:
                    account.status = data['is_enable']
                    user.is_enable = data ['is_enable']
                    db.session.commit()
                    return jsonify({'status':True,'msg':'Account Enabled Successfully','is_enabled':account.status})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})
               

account_blueprint = Blueprint('account',__name__)
api = Api(account_blueprint)

api.add_resource(createAccount,'/createAccount')
api.add_resource(GetAllAccounts,'/GetAllAccounts')
api.add_resource(getAccountsById,'/getAccountsById/<string:uuid>')
api.add_resource(updateAccount,'/updateAccount/<string:uuid>')
api.add_resource(enableDisableAccountById,'/enableDisableAccountById/<string:uuid>')
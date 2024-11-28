from datetime import timedelta
from flask_jwt_extended import (JWTManager, jwt_required, get_jwt_identity, get_jwt, create_access_token, create_refresh_token)
from models import  CrashReports, Occupants, PoliceDepartmentModel, Roles,Users,Accounts
from db import db
from flask import jsonify,request,Blueprint,session
from flask_restful import Api,Resource
import hashlib

from flask_cors import cross_origin

from test import role_required, sendMailToResetPassword
        
# Change password
class ChangePassword(Resource):
    @staticmethod
    def hash_password(password):
        md5 = hashlib.md5()
        md5.update(password.encode('utf-8'))
        return md5.hexdigest()
    @role_required('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_USER')
    def post(self):
        try:
            data = request.get_json()
            account_id = data.get('account_id')
            old_password = data.get('old_password')
            new_password = data.get('new_password')
            confirm_password = data.get('confirm_password')
            if old_password == new_password:
                return jsonify({'msg':'Same As Old Password'})
            user = Users.query.filter(Users.account_id ==account_id,Users.password==self.hash_password(old_password)).first()
            if user:
                if new_password == confirm_password:
                    user.password = self.hash_password(new_password)
                    db.session.commit()
                    return jsonify({'msg':'Password Updated Successfully, Please Login Again','status':True})
                return jsonify({'msg': 'Passwords Do Not Match','status':False})
            return jsonify({'msg':'Old password is not correct','status':False})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})    

def check_md5_hash(hashed_password, password):
    md5 = hashlib.md5()
    md5.update(password.encode('utf-8'))
    return hashed_password == md5.hexdigest()
class userLogin(Resource):
    def post(self):
        try:
            data = request.form
            username = data.get('username')
            password = data.get('password')
            user = Users.query.filter_by(username=username,status=1).first()
            if not check_md5_hash(user.password,password):  # Compare using MD5 hash
                return jsonify({'message': 'Password Wrong','status':False})
            if user is None:
                return jsonify({'message': 'failed no such user','status':False})
            if user.is_enable == 0:
                    return jsonify({'data':{'msg': 'Your Account is Disabled, Please Contact Superadmin'}, 'status': False})
            rolename = Roles.query.filter_by(role_id=user.role_id).first()
            refresh_token = create_refresh_token(identity=(user.username),expires_delta=timedelta(hours=24))
            access_token = create_access_token(identity=(user.username),expires_delta=timedelta(hours=24))
            return jsonify({'status':True,
                            'refresh_token':refresh_token,
                            'access_token':access_token,
                            'role_id':user.role_id,
                            'account_id':user.account_id,
                            'roleName':rolename.role,
                            'userDetails':{
                                'user':user.user_id,
                                'username':user.username
                            }})
        except Exception as e:
            return str(e)
        
# police department login 
class policeDepartmentLogin(Resource):
    def post(self):
        try:
            data = request.form
            department_name = data.get('department_name')
            username = data.get('username')
            password = data.get('password')
            if not department_name:
                return jsonify({'message': 'Department name is required', 'status': False})
            police = PoliceDepartmentModel.query.filter_by(name=department_name).first()
            if not police:
                return jsonify({'message': 'Department not found', 'status': False})
            if police.is_enabled == 0:
                return jsonify({'data':{'msg': 'Your Account is Disabled, Please Contact Superadmin'}, 'status': False})
            account_data = Accounts.query.filter_by(police_department_id=police.police_department_id).all()
            for acc in account_data:
                user_data = Users.query.filter_by(account_id=acc.account_id,username=username).first() 
                if user_data:
                    user = Users.query.filter_by(username=username, status=1).first()
                    if not user or not check_md5_hash(user.password, password):  
                        return jsonify({'message': 'Incorrect username or password', 'status': False})
                    rolename = Roles.query.filter_by(role_id=user.role_id).first()
                    refresh_token = create_refresh_token(identity=user.username, expires_delta=timedelta(hours=24))
                    access_token = create_access_token(identity=user.username, expires_delta=timedelta(hours=24))
                    return jsonify({
                        'status': True,
                        'refresh_token': refresh_token,
                        'access_token': access_token,
                        'role_id': user.role_id,
                        'account_id': user.account_id,
                        'roleName': rolename.role,
                        'userDetails': {
                            'user': user.user_id,
                            'username': user.username
                        }
                    })
                return jsonify({'msg':'No User Found For This Department','status':False})
        except Exception as e:
            return str(e)
    
 # Reset Password for caller admin
class resetPassword(Resource):
    @staticmethod
    def hash_password(password):
        # Use MD5 for hashing passwords
        md5 = hashlib.md5()
        md5.update(password.encode('utf-8'))
        return md5.hexdigest()  
    # Return the hash as a hex string
    # @role_required('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_USER')
    def post(self):
        try:
            data = request.get_json()
            account_id = data.get('account_id')
            accounts = Accounts.query.filter_by(account_id=account_id).first() 

            user = Users.query.filter_by(account_id=account_id).first()

            if accounts is None:
                return jsonify({'msg': 'Failed No Such User','status':False})
            changed_password = self.hash_password(user.username)
            user.password = changed_password
            db.session.commit()
            body = f"Your password is updated.Your New password :{user.username}"
            sendMailToResetPassword(accounts.email_id,body)
            return jsonify({'mail send':'Password Updated','status':True})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})  
          
class dashboardGetAll(Resource):
    def get(self):
        department = PoliceDepartmentModel.query.count()
        account = Accounts.query.count()
        occupants = Occupants.query.count()
        crashreport = CrashReports.query.count()
        return jsonify({'Total Department':department,'Total Accounts':account,'Total Occupants':occupants,'Total Crash Reports':crashreport})
        
      

user_blueprint = Blueprint('user',__name__)
api = Api(user_blueprint)

#Routes for the API
api.add_resource(resetPassword,'/resetPassword')
api.add_resource(ChangePassword,'/ChangePassword')
api.add_resource(userLogin,'/login/getToken')
api.add_resource(policeDepartmentLogin,'/police/login')
api.add_resource(dashboardGetAll,'/getAllCount')



from datetime import timedelta
from flask_jwt_extended import (JWTManager, jwt_required, get_jwt_identity, get_jwt, create_access_token, create_refresh_token)
from models import  Roles,Users,Accounts
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
    print (password,md5,md5.hexdigest(),hashed_password)
    return hashed_password == md5.hexdigest()
class userLogin(Resource):
    def post(self):

        data = request.form
        username = data.get('username')
        password = data.get('password')
        user = Users.query.filter_by(username=username,status=1).first()
        print('user',user)
        if user is None or not check_md5_hash(user.password, password):  # Compare using MD5 hash
            return jsonify({'message': 'Password Wrong','status':False})
        if user is None:
            return jsonify({'message': 'failed no such user','status':False})
        session['username'] = user.username 
        rolename = Roles.query.filter_by(role_id=user.role_id).first()
        refresh_token = create_refresh_token(identity=(user.username),expires_delta=timedelta(hours=1))
        access_token = create_access_token(identity=(user.username),expires_delta=timedelta(hours=1))
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
                

user_blueprint = Blueprint('user',__name__)
api = Api(user_blueprint)

#Routes for the API
api.add_resource(resetPassword,'/resetPassword')
api.add_resource(ChangePassword,'/ChangePassword')
api.add_resource(userLogin,'/login/getToken')



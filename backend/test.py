from email.message import EmailMessage
import smtplib
import ssl
from db import db
from functools import wraps
from flask import make_response,jsonify
from models import Users,Roles
from flask_jwt_extended import jwt_required,get_jwt_identity  # type: ignore
import jwt
from config import mail_password
import boto3
from config import AWSCredentials,folderName,innerFolderName,bannerFolderName,bucketName


s3 = boto3.client(
    's3',
    aws_access_key_id=AWSCredentials["AWS_ACCESS_KEY"],
    aws_secret_access_key=AWSCredentials["AWS_SECRET_ACCESS_KEY"]
)
# Authentication code
def role_required(*roles):
    def decorator(f):
        @jwt_required(refresh=True)
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                username = get_jwt_identity()
                user = Users.query.filter_by(username=username).first()
                if not user:
                    error_response = jsonify({"error": "User not found"})
                    return make_response(error_response, 403)
                user_roles = Roles.query.filter(Roles.role.in_(roles)).all()
                if not any(role.role_id == user.role_id for role in user_roles):
                    error_response = jsonify({"error": "Insufficient permissions"})
                    return make_response(error_response, 403)
                
                return f(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token expired'}), 401
            except Exception as e:
                return jsonify({'message': str(e)}), 500
        return decorated_function
    return decorator

# To send mail for reset password
def sendMailToResetPassword(to,body):
    email_sender = 'benhiveamsdev@gmail.com'
    email_password = mail_password
    email_receiver = to
    subject = "Dear user"
    body = body
    em = EmailMessage()
    em['FROM'] = email_sender
    em['TO'] = email_receiver
    em['subject'] = subject
    em.set_content(body)
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())

# FUNCTION FOR UPLOAD IMAGE IN AWS
def uploadFileToAWSS3(filepath,file_name,department_id,upload_status):
    try:
        if upload_status == 1:
            object_key = f"{folderName}{department_id}{innerFolderName}{file_name}"
        else:
            object_key = f"{folderName}{department_id}{bannerFolderName}{file_name}"
        s3.upload_file(
            filepath, 
            bucketName, 
            object_key,
            ExtraArgs={'ACL': 'public-read'}
        )
        return f"File uploaded successfully to {bucketName}/{object_key}"
    except FileNotFoundError:
        return f"The file {filepath} was not found."
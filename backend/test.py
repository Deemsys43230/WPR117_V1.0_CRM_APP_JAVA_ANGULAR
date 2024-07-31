from email.message import EmailMessage
import smtplib
import ssl
from db import db
from functools import wraps
from flask import make_response,jsonify
from models import Users,Roles
from flask_jwt_extended import jwt_required,get_jwt_identity  # type: ignore
import jwt

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
# def sendMailToResetPassword(to,body):
#     email_sender = 'benhiveamsdev@gmail.com'
#     email_password = mail_password
#     email_receiver = to
#     subject = "Dear user"
#     body = body
#     em = EmailMessage()
#     em['FROM'] = email_sender
#     em['TO'] = email_receiver
#     em['subject'] = subject
#     em.set_content(body)
#     context = ssl.create_default_context()
#     with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
#         smtp.login(email_sender, email_password)
#         smtp.sendmail(email_sender, email_receiver, em.as_string())
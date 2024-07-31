from sqlalchemy import ForeignKey
from app import db
from datetime import datetime
 
# models for roles
class Roles(db.Model):
    
    __tablename__ = 'roles'
    role_id = db.Column(db.Integer,primary_key=True)
    role = db.Column(db.String(50),unique=False)
    status = db.Column(db.Integer)
    
    def save_to_role(self):
        
        db.create_all()
        db.session.add(self)
        db.session.commit()

# models for user
class Users(db.Model):
    
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer,primary_key=True)
    
    # role id foreign key initialization
    role_id = db.Column(db.Integer, ForeignKey('roles.role_id'))
    role = db.relationship('Roles', backref='users')
    account_id=db.Column(db.String(32), ForeignKey('account.account_id'))
    account = db.relationship('Accounts', backref='users')
    username = db.Column(db.String(45))
    password = db.Column(db.String(600))
    is_enable = db.Column(db.Integer,default=0)
    status = db.Column(db.Integer,default=1)
    
    def save_to_users(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()     
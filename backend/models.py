from sqlalchemy import DateTime, ForeignKey
from app import db
from sqlalchemy import ForeignKey

# Models for Roles
class Roles(db.Model):
    __tablename__ = 'roles'
    role_id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50), unique=False)
    status = db.Column(db.Integer)

    def save_to_role(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()


class policeDepartmentModel(db.Model):
    
    __tablename__ = 'police_department'

    police_department_id = db.Column(db.Integer,primary_key=True)
    county_id = db.Column(db.Integer)
    name = db.Column(db.String(60))
    code = db.Column(db.String(50))
    login_link = db.Column(db.String(50),unique = True)
    search_link = db.Column(db.String(50),unique = True)
    created_date_time = db.Column(DateTime,default = datetime.now())
    status = db.Column(db.Integer,default = 1)
    is_enabled = db.Column(db.Integer,default = 1)
    
    def savePoliceDepartment(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()
class Accounts(db.Model):
    
    __tablename__ = 'accounts'
    
    account_id = db.Column(db.Integer,primary_key=True)
    police_department_id=db.Column(db.String(32), ForeignKey('police_department.police_department_id'))
    police_dep_id = db.relationship('policeDepartmentModel', backref='accounts')
    first_name = db.Column(db.String(60))
    last_name = db.Column(db.String(60))
    middle_name = db.Column(db.String(60))
    email_id = db.Column(db.String(60))
    phone_number = db.Column(db.String(60))
    added_date_time = db.Column(DateTime,default = datetime.now())
    is_deleted = db.Column(db.Integer,default=0)
    status = db.Column(db.Integer,default=1)
    
    def saveAccounts(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()

# models for user
class Users(db.Model):
    
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer,primary_key=True)
    # role id foreign key initialization
    role_id = db.Column(db.Integer, ForeignKey('roles.role_id'))
    role = db.relationship('Roles')
    account_id=db.Column(db.String(32), ForeignKey('accounts.account_id'))
    account = db.relationship('Accounts')
    username = db.Column(db.String(45))
    password = db.Column(db.String(600))
    is_enable = db.Column(db.Integer,default=1)
    status = db.Column(db.Integer,default=1)
    
    def save_to_users(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()     
    
class Users(db.Model):
    __tablename__="users"
    user_id = db.Column(db.Integer, primary_key=True)
    role_id=db.Column(db.Integer,unique=False)
    username=db.Column(db.String(50), unique=False)
    password=db.Column(db.String(100), unique=False)
    is_enable=db.Column(db.Integer, unique=False)
    status=db.Column(db.Integer, unique=False)

    def save_to_user(self):
        db.create_all()
        db.session.add(self)
        db.session()

class County(db.Model):
    __tablename__="county"
    county_id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(100), unique=False)
    status=db.Column(db.Integer,unique=False)
    def save_to_county(self):
        db.create_all()
        db.session.add(self)
        db.session()

from datetime import datetime
from sqlalchemy import DateTime, ForeignKey
from db import db
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

#models for county
class County(db.Model):
    __tablename__ = 'county'
    county_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=False)
    status = db.Column(db.Integer, unique=False)
    def save_to_county(self):
        db.create_all()
        db.session.add(self)
        db.session()

    
class PoliceDepartmentModel(db.Model):
    __tablename__ = 'police_department'
    police_department_id = db.Column(db.Integer, primary_key=True)
    county_id = db.Column(db.Integer,ForeignKey('county.county_id'))
    county = db.relationship('County', backref='police_department')
    name = db.Column(db.String(60))
    code = db.Column(db.String(50))
    login_link = db.Column(db.String(50), unique=True)
    search_link = db.Column(db.String(50), unique=True)
    created_date_time = db.Column(DateTime, default=datetime.now)
    status = db.Column(db.Integer, default=1)
    is_enabled = db.Column(db.Integer, default=1)

    def savePoliceDepartment(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()

class Accounts(db.Model):
    __tablename__ = 'accounts'
    account_id = db.Column(db.Integer, primary_key=True)
    police_department_id = db.Column(db.Integer, ForeignKey('police_department.police_department_id'))
    police_dep_id = db.relationship('PoliceDepartmentModel', backref='accounts')
    first_name = db.Column(db.String(60))
    last_name = db.Column(db.String(60))
    middle_name = db.Column(db.String(60))
    email_id = db.Column(db.String(60))
    phone_number = db.Column(db.String(60))
    added_date_time = db.Column(DateTime, default=datetime.now)
    is_deleted = db.Column(db.Integer, default=0)
    status = db.Column(db.Integer, default=1)

    def saveAccounts(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()

# Models for Users
class Users(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, ForeignKey('roles.role_id'))
    role = db.relationship('Roles', backref='users')
    account_id = db.Column(db.Integer, ForeignKey('accounts.account_id'))
    account = db.relationship('Accounts',backref='users')
    username = db.Column(db.String(45))
    password = db.Column(db.String(600))
    is_enable = db.Column(db.Integer, default=1)
    status = db.Column(db.Integer, default=1)

    def save_to_users(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()

   
# models for occupants
class Occupants(db.Model):
    
    __tablename__ = 'occupants'
    occupants_id = db.Column(db.Integer,primary_key = True)
    report_id = db.Column(db.String(32), ForeignKey('crash_reports.report_id'))
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    injuries = db.Column(db.String(4))
    seating_position = db.Column(db.String(4))
    sequence_no = db.Column(db.Integer)
    status = db.Column(db.Integer)
    
    def save_to_users(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()    
        db.session.commit()

class CrashReports(db.Model):
    __tablename__='crash_reports'
    report_id=db.Column(db.String(32),primary_key=True)
    account_id=db.Column(db.String(32),ForeignKey('accounts.account_id'))
    account_Details = db.relationship('Accounts')
    police_department_id=db.Column(db.String(32),ForeignKey('police_department.police_department_id'))
    report_number=db.Column(db.String(100))
    crash_date=db.Column(DateTime)
    location=db.Column(db.String(100))
    county_id=db.Column(db.String(32),ForeignKey('county.county_id'))
    county=db.relationship('County')
    crash_severity=db.Column(db.Integer) 
    no_of_occupants= db.Column(db.Integer)  
    file_name=db.Column(db.String(250))
    added_date=db.Column(DateTime, default=datetime.now)
    added_date_time= db.Column(DateTime,default=datetime.now) 
    status=db.Column(db.Integer)
    # occupant=db.Column(db.String(32),ForeignKey('occupants.occupants_id'))
    # occupants = db.relationship('Occupants', backref='crash_reports', lazy=True)
    
    police=db.relationship('PoliceDepartmentModel',backref='crash_reports',lazy=True)

    def save_to_crash_reports(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()

class CrashReportRestriction(db.Model):
    __tablename__='crash_report_restriction'
    client_ip=db.Column(db.String(32),primary_key=True)
    last_access_time=db.Column(DateTime, default=datetime.now)
    status = db.Column(db.String(32),default=1)
    def save_to_crash_reports_restriction(self):
        db.create_all()
        db.session.add(self)
        db.session.commit()


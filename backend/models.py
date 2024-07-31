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
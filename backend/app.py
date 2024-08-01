from datetime import timedelta
from flask import Flask
from db import db
from config import sqlconfig
# from models import Roles
from models import Users
from api.user import user_blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import jwt_required,get_jwt_identity
from flask import config, make_response,jsonify

app = Flask(__name__)
 
 
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['SQLALCHEMY_DATABASE_URI'] = sqlconfig

CORS(app)
db.init_app(app)
jwt = JWTManager(app)
app.register_blueprint(user_blueprint)
app.register_blueprint(Roles_blueprint, url_prefix='/role')
app.register_blueprint(County_Blueprint,url_prefix='/county')
# app.register_blueprint(User_blueprint,url_prefix='/user')
# app.register_blueprint(PoliceDepartment_blueprint,url_prefix='/policeDepartment')
if __name__ == '__main__':
    app.run(debug=True)


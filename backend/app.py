from datetime import timedelta
from flask import Flask
from api.county import County_Blueprint
from api.roles import Roles_blueprint
from db import db
from config import sqlconfig
from api.user import user_blueprint
from api.roles import Roles_blueprint
from api.county import County_Blueprint
from api.crashReport import CrashReport_Blueprint
from api.occupants import Occupants_Blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.account import account_blueprint
from api.policeDepartment import police_blueprint


app = Flask(__name__)
 
 
app.config['SECRET_KEY'] = 'mysecretkey'
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['SQLALCHEMY_DATABASE_URI'] = sqlconfig
app.config['PROPAGATE_EXCEPTIONS'] = True


CORS(app)
db.init_app(app)
jwt = JWTManager(app)
app.register_blueprint(Roles_blueprint, url_prefix='/role')
app.register_blueprint(County_Blueprint,url_prefix='/county')
app.register_blueprint(account_blueprint)
app.register_blueprint(police_blueprint)
app.register_blueprint(user_blueprint,url_prefix='/user')
app.register_blueprint(CrashReport_Blueprint,url_prefix='/crash_reports')
app.register_blueprint(Occupants_Blueprint,url_prefix='/occupants')


if __name__ == '__main__':
    app.run(debug=True)


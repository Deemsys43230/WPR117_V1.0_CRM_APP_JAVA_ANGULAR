from datetime import timedelta
from flask import Flask, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from api.roles import Roles_blueprint
import db
from config import sqlconfig



app = Flask(__name__)

app.config['SECRET_KEY'] = 'mysecretkey'
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(minutes=60)
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=60)
app.config['SQLALCHEMY_DATABASE_URI'] = sqlconfig
# app.config['PROPAGATE_EXCEPTIONS'] = True

CORS(app)
db.init_app(app)
jwt = JWTManager(app)


app.register_blueprint(Roles_blueprint)

if __name__ == '__main__':
    app.run(debug=False)
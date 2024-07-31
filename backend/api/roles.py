from flask_restful import Api,Resource
from flask import request,jsonify,Blueprint
from models import Roles
import uuid
from sqlalchemy import or_
from test import role_required
from db import db

# # save roles by super admin
# class CreateRoles(Resource):  
    
#     @role_required('ROLE_SUPER_ADMIN')
#     def post(self):
#             data = request.get_json()
#             role = Roles(role=data['role'],status = data['status'])
#             role.save_to_role()
#             return jsonify({'msg':'role added','data':{**data},'status':True})
    

class getRoles(Resource):
    @role_required('ROLE_SUPER_ADMIN')
    def get(self):
        role = Roles.query.all()
        role_list = [{
            'role_id':roles.role_id,
            'role_name':roles.role,
            'status':roles.status
        }for roles in role]
        return jsonify({'data':role_list,'status':True})

# class getRolesById(Resource):
#     @role_required('ROLE_SUPER_ADMIN')
#     def get(self,id):
#         roles = Roles.query.filter_by(role_id=id).first()
#         role_list = {
#             'role_id':roles.role_id,
#             'role_name':roles.role,
#             'status':roles.status
#         }
#         return jsonify({'data':role_list,'status':True})
# class updateRoles(Resource):
#     @role_required('ROLE_SUPER_ADMIN')
#     def put(self,id):
#         roles = Roles.query.filter_by(role_id=id).first()
#         if roles:
#             data = request.get_json()
#             roles.role=data['role']
#             roles.status = data['status']
#             db.session.commit()
#             return jsonify({'data':{**data},'status':True})
#         return jsonify({'status':False})

    
Roles_blueprint = Blueprint('roles',__name__)
api = Api(Roles_blueprint)
# api.add_resource(CreateRoles,'/CreateRoles')
api.add_resource(getRoles,'/getRoles')
# api.add_resource(getRolesById,'/getRolesById/<int:id>')
# api.add_resource(updateRoles,'/updateRoles/<int:id>')
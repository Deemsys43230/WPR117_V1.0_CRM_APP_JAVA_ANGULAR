
from flask import request,jsonify,Blueprint
from models import Roles
from flask_restful import Api, Resource
from sqlalchemy import or_
from test import role_required

# from db import db

class CreateRoles(Resource):
    def post(self):
        data=request.get_json()
        role=Roles(role=data['role'],status=data['status'])
        role.save_to_role()
        return jsonify({'msg':'role added successfully','data':{**data},'status':True})
    
class getRoles(Resource):
    # @role_required('ROLE_SUPER_ADMIN')
    def get(self):
        roles123=Roles.query.filter(Roles.role_id!=3).all()
        role_list=[{
            'role_id':roles.role_id,
            'role':roles.role,
            'status':roles.status
        }for roles in roles123]
        return jsonify({'data':role_list,'status':True})

class getRoleById(Resource):
    def get(self,id):
        role=Roles.query.get(id)
        if role:
            role_details = {
                'role_id': role.role_id,
                'role': role.role,
                'status': role.status
            }
            response = {'data': role_details, 'status': True}
        else:
            response = {'data': None, 'status': False, 'message': 'Role not found'}
        return jsonify(response)



Roles_blueprint = Blueprint('role',__name__)
api=Api(Roles_blueprint)
api.add_resource(CreateRoles,'/createRoles')
api.add_resource(getRoles,'/getAllRoles')
api.add_resource(getRoleById,'/getRoleById/<id>')
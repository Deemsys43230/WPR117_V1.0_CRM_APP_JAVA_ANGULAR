from flask import request,jsonify,Blueprint
from models import Occupants
from flask_restful import Api, Resource
from sqlalchemy import or_
from test import role_required

class GetAllOccupants(Resource):
    def post(self):
        requestDetails=request.get_json()
        if not requestDetails or 'page' not in requestDetails or 'itemsPerPage' not in requestDetails:
            data = Occupants.query.all()
            countlist = [{
            'occupants_id':occupants.occupants_id,
            'report_id': occupants.report_id,
            'first_name': occupants.first_name,
            'last_name': occupants.last_name,
            'injuries':occupants.injuries,
            'seating_position':occupants.seating_position,
            'sequence_no':occupants.sequence_no,
            'status':occupants.status
            } for occupants in data]
            return jsonify({'data': countlist, 'status': True})
        else:
            page=requestDetails['page']
            itemsPerPage=requestDetails['itemsPerPage']
            data = Occupants.query.paginate(page=page, per_page=itemsPerPage, error_out=False)
            countlist = [{
            'occupants_id':occupants.occupants_id,
            'report_id': occupants.report_id,
            'first_name': occupants.first_name,
            'last_name': occupants.last_name,
            'injuries':occupants.injuries,
            'seating_position':occupants.seating_position,
            'sequence_no':occupants.sequence_no,
            'status':occupants.status
            } for occupants in data]
            return jsonify({'data': countlist, 'status': True,'total':data.total,'pages':data.pages})

# Create a Blueprint
Occupants_Blueprint = Blueprint('occupants', __name__)

# Create an Api instance
api = Api(Occupants_Blueprint)

# Add resource to the API
api.add_resource(GetAllOccupants, '/getAllOccupants')
from flask import request,jsonify,Blueprint
from models import County
from flask_restful import Api, Resource
from sqlalchemy import or_
from test import role_required

class GetAllCounty(Resource):
    def post(self):
        requestDetails=request.get_json()
        if not requestDetails or 'page' not in requestDetails or 'itemsPerPage' not in requestDetails:
            data = County.query.all()
            countlist = [{
            'county_id': county.county_id,
            'status': county.status,
            'name': county.name
            } for county in data]
            return jsonify({'data': countlist, 'status': True})
        else:
            page=requestDetails['page']
            itemsPerPage=requestDetails['itemsPerPage']
            data = County.query.paginate(page=page, per_page=itemsPerPage, error_out=False)
            countlist = [{
            'county_id': county.county_id,
            'status': county.status,
            'name': county.name
            } for county in data]
            return jsonify({'data': countlist, 'status': True,'total':data.total,'pages':data.pages})

# Create a Blueprint
County_Blueprint = Blueprint('county', __name__)

# Create an Api instance
api = Api(County_Blueprint)

# Add resource to the API
api.add_resource(GetAllCounty, '/getAllCounty')
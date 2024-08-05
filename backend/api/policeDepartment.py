import os
from flask import Blueprint, jsonify, request
from flask_restful import Resource,Api
from config import CRMAppDomain,bucketURL,bannerLocation,awsUpload,fileName,tempFolder,defaultBannerName
from models import PoliceDepartmentModel
from db import db
from test import uploadFileToAWSS3

# TO CREATE POLICE DEPARTMENT 
class createPoliceDepartment(Resource):
    def post(self):
        try:
            data = request.get_json()
            police = PoliceDepartmentModel(
                county_id=data['county_id'],
                name = data['name'],
                code = data['code'],
                login_link = data['login_link'],
                search_link = data['search_link']
                )
            police.savePoliceDepartment()
            return jsonify({'msg':'Police Department Added Sucessfully','data':{**data}})
        
        except Exception as e:
            return jsonify({'msg':'Error While Adding Police Department','error':str(e)})

# GET ALL POLICE DEPARTMENTS WITH SEARCH AND PAGINATION
class getAllPoliceDepartment(Resource):
    def post(self):
        data = request.get_json()
        items_per_page = data.get('items_per_page',None)
        query_count = PoliceDepartmentModel.query.filter_by(status=1).count()
        if items_per_page == "":
            items_per_page = query_count
        try:
            data = request.get_json()
            page = data.get('page',1)
            name = data.get('name',None)
            county = data.get('county',None)
            offset = (page - 1) * items_per_page
            query = PoliceDepartmentModel.query
            if name:
                query = query.filter(PoliceDepartmentModel.name.ilike(f"%{name}%"))
            if county:
                query = query.filter(PoliceDepartmentModel.county_id.ilike(f"%{county}%"))
            count = query.count()
            police = query.limit(items_per_page).offset(offset).all()
            result=[]
            for data in police:
                police_data = {
                    'department_id':data.police_department_id,
                    'county_id':data.county_id,
                    'county_name':data.county.name,
                    'name':data.name,
                    'status':data.county.status,
                    'code':data.code,
                    'login_link':data.login_link,
                    'search_link':data.search_link,
                    'status':data.status,
                    'viewLoginLink':CRMAppDomain+""+data.login_link,
                    'viewSearchLink':CRMAppDomain+""+data.search_link
                }
                result.append(police_data)
            return jsonify({'status':True,'data':result,'count':count})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})
    
# GET POLICE DEPARTMENT BY ID
class getByIdPoliceDepartment(Resource):
    def get(self,id):
        try:
            data = PoliceDepartmentModel.query.filter_by(police_department_id=id).first()
            if data:
                police_data = {
                    'county_id':data.county_id,
                    'count_name':data.county.name,
                    'status':data.county.status,
                    'name':data.name,
                    'code':data.code,
                    'login_link':data.login_link,
                    'search_link':data.search_link,
                    'status':data.status,
                    'viewLoginLink':CRMAppDomain+""+data.login_link,
                    'viewSearchLink':CRMAppDomain+""+data.search_link,
                    'url':bucketURL+""+str(id)+""+bannerLocation
                }
                return jsonify({'status':True,'data':police_data})
            return jsonify({'status':False,'msg':'No Such Details Found'})
                
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

# UPDATE POLICE DEPARTMENT BY ID
class updatePoliceDepartment(Resource):
    def put(self,id):
        try:
            police = PoliceDepartmentModel.query.filter_by(police_department_id=id).first()
            if police:
                data = request.get_json()
                police.county_id = data['county_id']
                police.name = data['name']
                police.code = data['code']
                db.session.commit()
                return jsonify({'status':True,'msg':'Updated Pricing Plans Details','data':{**data}})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

# ENABLE DISABLE POLICE DEPARTMENT BY ID
class enableDisablePoliceDepartment(Resource):
    def post(self,id):
        try:
            police = PoliceDepartmentModel.query.filter_by(police_department_id=id).first()
            data = request.get_json()
            if police:
                if data['is_enabled'] == 0:
                    police.is_enabled = data['is_enabled']
                    db.session.commit()
                    return jsonify({'status':True,'msg':'Police Department Disabled Successfully','is_enabled':police.is_enabled})
                else:
                    police.is_enabled = data['is_enabled']
                    db.session.commit()
                    return jsonify({'status':True,'msg':'Police Department Enabled Successfully','is_enabled':police.is_enabled})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

# TO UPLOAD IMAGE WHEN IMAGE IS NOT PROVIDED        
class uploadPoliceDepartmentWithoutFile(Resource):
    def post(self,dep_id): 
        
        path = tempFolder +""+ defaultBannerName
        if awsUpload == 1:
            uploadFileToAWSS3(path,fileName,dep_id,2)
        return None
    
 # TO SAVE IMAGE IN TEMPORARY STORAGE

def save_temporary_file(file, path):
    try:
        with open(path, 'wb') as f:
            f.write(file.read())
        return path
    
    except Exception as e:
        return str(e)

# TO UPLOAD IMAGE IN AWS
class UploadImageForPoliceDepartment(Resource):
    def post(self):
        data = request.form
        file = request.files.get('file')    
        dep_id = data.get('dep_id')
        
        path = os.path.join(tempFolder, str(dep_id), file.filename).replace('\\', '/')
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        if awsUpload == 1:
            saved_file_path = save_temporary_file(file, path)
            if saved_file_path:
                uploadFileToAWSS3(saved_file_path, file.filename, dep_id, 2)
                try:
                    os.remove(saved_file_path)
                except OSError as e:
                    return jsonify({'msg': 'File Uploaded Successfully'})
            else:
                return jsonify({'msg': 'Failed to save file'}), 500
        return jsonify({'msg': 'AWS upload not enabled'}), 400

police_blueprint = Blueprint('police',__name__)
api = Api(police_blueprint)

api.add_resource(createPoliceDepartment,'/savePoliceDepartment')
api.add_resource(getAllPoliceDepartment,'/getAllSearchPoliceDepartment')
api.add_resource(getByIdPoliceDepartment,'/getByIdPoliceDepartment/<int:id>')
api.add_resource(updatePoliceDepartment,'/updatePoliceDepartment/<int:id>')
api.add_resource(enableDisablePoliceDepartment,'/enableDisablePoliceDepartment/<int:id>')
api.add_resource(UploadImageForPoliceDepartment,'/uploadimageForPoliceDepartment')
api.add_resource(uploadPoliceDepartmentWithoutFile,'/uploadPoliceDepartmentWithoutFile/<int:dep_id>')
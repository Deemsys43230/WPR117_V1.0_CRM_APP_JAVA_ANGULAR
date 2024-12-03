from operator import and_
import os
from flask import Blueprint, Flask, jsonify,request
from flask_restful import Resource,Api
from config import AWSCredentials, CRMAppDomain,bucketURL,bannerLocation,awsUpload,tempFolder,folderName,bannerFolderName
from models import Accounts, PoliceDepartmentModel, Users
from db import db
from test import get_property, role_required, uploadFileToAWSS3
import requests


app = Flask(__name__)
# Configure upload folder
app.config['UPLOAD_FOLDER'] = 'C:/wamp64/www/SavePoliceDepartmentImage'  # Change to your WAMP server path
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max upload size (optional)
# Allowed file extensions for validation (optional)
ALLOWED_EXTENSIONS = {'jpg'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# TO CREATE POLICE DEPARTMENT 
class createPoliceDepartment(Resource):
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
    def post(self):
        try:
            data = request.form
            name = data.get('name')
            code = data.get('code')
            police_department_name = PoliceDepartmentModel.query.filter_by(name=name).first()
            police_department_code = PoliceDepartmentModel.query.filter_by(code=code).first()
            image = request.files.get('image')
            if police_department_name is None:
                if police_department_code is None:
                    police = PoliceDepartmentModel(
                        county_id=data.get('county_id'),
                        name=name,
                        code=code,
                        login_link=data.get('login_link'),
                        search_link=data.get('search_link')
                    )
                    db.create_all()
                    db.session.add(police)
                    db.session.flush()
                    if 'image' not in request.files:
                        return jsonify({'error': 'No file part in the request'})
                    if not allowed_file(image.filename):
                        return jsonify({'error': 'Invalid file type. Only PDF files are allowed.'})
                    filename = f"{police.police_department_id}_banner.jpg"
                    upload_folder = app.config['UPLOAD_FOLDER']
                    save_path = os.path.join(upload_folder, filename)
                    os.makedirs(upload_folder, exist_ok=True)
                    image.save(save_path)
                    createPoliceAccounts(police)
                    # AWS image upload
                    # if image is None:
                    #     default_image_path = os.path.join(tempFolder,'banner.jpg').replace('\\','/')
                    #     default_file_name='banner.jpg'
                    #     file_url = uploadFileToAWSS3(default_image_path, default_file_name, police.police_department_id, 2)
                    # else:
                    #     path = os.path.join(tempFolder, str(police.police_department_id), image.filename)
                    #     os.makedirs(os.path.dirname(path), exist_ok=True)
                    #     if awsUpload == 1:
                    #         saved_file_path = save_temporary_file(image, path).replace('\\','/')
                    #         if saved_file_path:
                    #             file_url = uploadFileToAWSS3(saved_file_path,image.filename, police.police_department_id, 2)
                    #             os.remove(saved_file_path)
                    #             folder_path = os.path.dirname(saved_file_path)
                    #             if not os.listdir(folder_path):
                    #                 os.rmdir(folder_path)
                    db.session.commit()           
                    return jsonify({
                                'msg': 'Police Department Added Successfully',
                                'status': True,
                                'police_department_id': police.police_department_id,
                                'data': {**data}
                            })
                else:
                    return jsonify({'msg': 'Duplicate Creation Of Department Code', 'status': False})
            else:
                return jsonify({'msg': 'Duplicate Creation Of Department Name', 'status': False})
        except Exception as e:
            return jsonify({'msg': 'An error occurred', 'status': False, 'error': str(e)})

# TO STORE IN CRO APP - POLICE AGENCY
def createPoliceAccounts(police):
    payload = {
        "agency_id":police.police_department_id,
        "name":police.name,
        "county":police.county_id,
        "scheduler_type":1
    }
    headers = {
        'Content-Type': 'application/json'
    }
    url = get_property("CRODomain") + get_property("createPolice")
    response = requests.post(url, json=payload, headers=headers)
    if response is not None and response.status_code == 200:
        return jsonify({'status': True})    
    else:
        return jsonify({
            'status': False,
            'msg': 'Failed to get a valid response from the server.',
        })
        
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
                    'url':f"http://14.195.114.174/SavePoliceDepartmentImage/{data.police_department_id}_banner.jpg",
                    'is_enabled':data.is_enabled,
                    'viewLoginLink':CRMAppDomain+""+data.login_link,
                    'viewSearchLink':CRMAppDomain+""+data.search_link,
                }
                result.append(police_data)
            return jsonify({'status':True,'data':result,'count':count})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})
    
# GET POLICE DEPARTMENT BY ID
class getByIdPoliceDepartment(Resource):
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
    def get(self,id):
        try:
            data = PoliceDepartmentModel.query.filter_by(police_department_id=id).first()
            if data:
                police_data = {
                    'department_id':data.police_department_id,
                    'county_id':data.county_id,
                    'count_name':data.county.name,
                    'status':data.county.status,
                    'name':data.name,
                    'code':data.code,
                    'login_link':data.login_link,
                    'search_link':data.search_link,
                    'status':data.status,
                    'is_enabled':data.is_enabled,
                    'viewLoginLink':CRMAppDomain+""+data.login_link,
                    'viewSearchLink':CRMAppDomain+""+data.search_link,
                    # 'url':f"https://{AWSCredentials['PUBLIC_BUCKET_NAME']}.s3.amazonaws.com/{folderName}{id}{bannerLocation}"
                    'url':f"http://14.195.114.174/SavePoliceDepartmentImage/{data.police_department_id}_banner.jpg",
                }
                return jsonify({'status':True,'data':police_data})
            return jsonify({'status':False,'msg':'No Such Details Found'})
                
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

# GET POLICE DEPARTMENT BY NAME
class getByNamePoliceDepartment(Resource):
    def get(self,name):
        try:
            data = PoliceDepartmentModel.query.filter_by(name=name).first()
            if data:
                police_data = {
                    'department_id':data.police_department_id,
                    'county_id':data.county_id,
                    'count_name':data.county.name,
                    'status':data.county.status,
                    'name':data.name,
                    'code':data.code,
                    'login_link':data.login_link,
                    'search_link':data.search_link,
                    'status':data.status,
                    'is_enabled':data.is_enabled,
                    'viewLoginLink':CRMAppDomain+""+data.login_link,
                    'viewSearchLink':CRMAppDomain+""+data.search_link,
                    # 'url':bucketURL+""+str(data.police_department_id)+""+bannerLocation
                    'url':f"http://14.195.114.174/SavePoliceDepartmentImage/{data.police_department_id}_banner.jpg",
                }
                return jsonify({'status':True,'data':police_data})
            return jsonify({'status':False,'msg':'No Such Details Found'})
                
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

# UPDATE POLICE DEPARTMENT BY ID
class updatePoliceDepartment(Resource):
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
    def put(self,id):
        try:
            police = PoliceDepartmentModel.query.filter_by(police_department_id=id).first()
            if police:
                # file_url = None
                data = request.form
                police.county_id=data.get('county_id')
                police.name = data.get('name')
                police.code = data.get('code')
                image = request.files.get('image')
                if image and allowed_file(image.filename):
                    filename = f"{police.police_department_id}_banner.jpg"
                    upload_folder = app.config['UPLOAD_FOLDER']
                    os.makedirs(upload_folder, exist_ok=True) 
                    save_path = os.path.join(upload_folder, filename)
                    image.save(save_path)
                    police.image = filename
                    db.session.commit()
                # elif image is not None:
                #     return jsonify({'error': 'Invalid file type. Only allowed file types are supported.'})
                else:
                    police.image = f"{police.police_department_id}_banner.jpg"
                    db.session.commit()

                # if image:
                #     path = os.path.join(tempFolder, str(police.police_department_id), image.filename)
                #     os.makedirs(os.path.dirname(path), exist_ok=True)
                #     if awsUpload == 1:
                #         saved_file_path = save_temporary_file(image, path).replace('\\','/')
                #         if saved_file_path:
                #             file_url = uploadFileToAWSS3(saved_file_path,image.filename, police.police_department_id, 2)
                #             police.image = file_url
                #             db.session.commit()
                #             os.remove(saved_file_path)
                #             folder_path = os.path.dirname(saved_file_path)
                #             if not os.listdir(folder_path):
                #                 os.rmdir(folder_path)
                return jsonify({'status':True,'msg':'Updated Police Department Details','data':{**data}})
        except Exception as e:
            return jsonify({'status':False,'error':str(e)})

# ENABLE DISABLE POLICE DEPARTMENT BY ID
class enableDisablePoliceDepartment(Resource):
    @role_required('ROLE_SUPER_ADMIN','ROLE_USER','ROLE_ADMIN')
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


 # TO SAVE IMAGE IN TEMPORARY STORAGE
def save_temporary_file(file, path):
    try:
        with open(path, 'wb') as f:
            f.write(file.read())
        return path
    except Exception as e:
        return str(e)
class policeDepartmentDetailsByUsername(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        user = Users.query.filter_by(username=username).first()
        account = Accounts.query.filter_by(account_id = user.account_id).first()
        if account:
            police_data = {
                'account_id':account.account_id,
                        'first_name':account.first_name,
                        'last_name':account.last_name,
                        'middle_name':account.middle_name,
                        'email_id':account.email_id,
                        'phone_number':account.phone_number,
                        'username':user.username,
                'police_data':{     
                    'department_id':account.police_department_id,
                    'county_id':account.police_dep_id.county_id,
                    'count_name':account.police_dep_id.county.name,
                    'status':account.police_dep_id.county.status,
                    'name':account.police_dep_id.name,
                    'code':account.police_dep_id.code,
                    'login_link':account.police_dep_id.login_link,
                    'search_link':account.police_dep_id.search_link,
                    'status':account.police_dep_id.status,
                    'is_enabled':account.police_dep_id.is_enabled,
                    'viewLoginLink':CRMAppDomain+""+account.police_dep_id.login_link,
                    'viewSearchLink':CRMAppDomain+""+account.police_dep_id.search_link,
                    # 'url':bucketURL+""+str(account.police_dep_id.police_department_id)+""+bannerLocation
                    'url':f"http://14.195.114.174/SavePoliceDepartmentImage/{data.police_department_id}_banner.jpg",
                }
                }
            return jsonify({'msg':'Police Department Details','data':police_data,'status':True})
        return jsonify({'msg':'Police Department Details Not Found','status':False})
        
    
police_blueprint = Blueprint('police',__name__)
api = Api(police_blueprint)

api.add_resource(createPoliceDepartment,'/savePoliceDepartment')
api.add_resource(getAllPoliceDepartment,'/getAllSearchPoliceDepartment')
api.add_resource(getByIdPoliceDepartment,'/getByIdPoliceDepartment/<int:id>')
api.add_resource(updatePoliceDepartment,'/updatePoliceDepartment/<int:id>')
api.add_resource(enableDisablePoliceDepartment,'/enableDisablePoliceDepartment/<int:id>')
api.add_resource(getByNamePoliceDepartment,'/getByNamePoliceDepartment/<string:name>')
api.add_resource(policeDepartmentDetailsByUsername,'/policeDepartmentDetailsByUsername')


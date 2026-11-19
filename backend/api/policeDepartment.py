from operator import and_
import os
import threading
import boto3
from flask import Blueprint, Flask, jsonify, request
from flask_restful import Resource, Api
from config import AWSCredentials, CRMAppDomain, bucketURL, bannerLocation, awsUpload, tempFolder, folderName, bannerFolderName
from models import Accounts, PoliceDepartmentModel, Users
from db import db
from test import get_property, role_required, uploadFileToAWSS3
import requests

s3 = boto3.client(
    's3',
    aws_access_key_id=AWSCredentials["AWS_ACCESS_KEY"],
    aws_secret_access_key=AWSCredentials["AWS_SECRET_ACCESS_KEY"]
)

# Allowed file extensions for validation (optional)
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_image_to_s3(file, department_id, filename="banner.jpg"):
    bucket = 'injurycrashreports' if AWSCredentials.get('PUBLIC_BUCKET_NAME') in [None, '', 'crm-tests'] else AWSCredentials['PUBLIC_BUCKET_NAME']
    object_key = f"{folderName}{department_id}/banner/{filename}"
    ext = filename.rsplit('.', 1)[1].lower() if '.' in filename else 'jpg'
    content_types = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'webp': 'image/webp',
        'gif': 'image/gif',
        'bmp': 'image/bmp'
    }
    content_type = content_types.get(ext, 'image/jpeg')
    try:
        s3.delete_object(Bucket=bucket, Key=object_key)
    except Exception:
        pass

    if hasattr(file, 'read'):
        if hasattr(file, 'seek'):
            file.seek(0)
        s3.upload_fileobj(
            Fileobj=file,
            Bucket=bucket,
            Key=object_key,
            ExtraArgs={'ContentType': content_type}
        )
    else:
        # file is a path string
        s3.upload_file(
            file,
            bucket,
            object_key,
            ExtraArgs={'ContentType': content_type}
        )
    return f"https://cdn.crashreportsonline.com/{object_key}"

def get_police_banner_url(department_id):
    return f"https://cdn.crashreportsonline.com/{folderName}{department_id}/banner/banner.jpg"

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

                    file_url = None
                    if image and image.filename != '':
                        if not allowed_file(image.filename):
                            return jsonify({'error': 'Invalid file type. Only image files (jpg, jpeg, png, webp) are allowed.'})
                        file_url = upload_image_to_s3(image, police.police_department_id, "banner.jpg")
                    else:
                        default_image_path = os.path.join(tempFolder, 'banner.jpg').replace('\\', '/')
                        if os.path.exists(default_image_path):
                            file_url = upload_image_to_s3(default_image_path, police.police_department_id, "banner.jpg")
                        else:
                            file_url = get_police_banner_url(police.police_department_id)

                    db.session.commit()
                    # Sync to CRO in background (non-blocking)
                    threading.Thread(target=createPoliceAccounts, args=(police.police_department_id, police.name, police.county_id), daemon=True).start()
                    return jsonify({
                        'msg': 'Police Department Added Successfully',
                        'status': True,
                        'police_department_id': police.police_department_id,
                        'url': file_url,
                        'data': {**data, 'url': file_url}
                    })
                else:
                    return jsonify({'msg': 'Duplicate Creation Of Department Code', 'status': False})
            else:
                return jsonify({'msg': 'Duplicate Creation Of Department Name', 'status': False})
        except Exception as e:
            return jsonify({'msg': 'An error occurred', 'status': False, 'error': str(e)})

# TO STORE IN CRO APP - POLICE AGENCY
def createPoliceAccounts(department_id, department_name, county_id):
    try:
        cro_domain = get_property("CRODomain") or "http://14.195.114.174:5005"
        create_police_endpoint = get_property("createPolice") or "createPoliceAgency"
        url = cro_domain.rstrip('/') + '/' + create_police_endpoint.lstrip('/')
        payload = {
            "agency_id": department_id,
            "name": department_name,
            "county": county_id,
            "scheduler_type": 1
        }
        headers = {'Content-Type': 'application/json'}
        response = requests.post(url, json=payload, headers=headers, timeout=10)
        if response is not None and response.status_code == 200:
            print(f"[CRO SYNC] Police agency {department_id} synced successfully")
            return {'status': True}
        else:
            print(f"[CRO SYNC] Failed to sync police agency {department_id}: {response.status_code if response else 'No response'}")
            return {'status': False, 'msg': 'Failed to get a valid response from the server.'}
    except requests.exceptions.RequestException as e:
        print(f"[CRO SYNC ERROR] Error syncing police agency to CRO: {e}")
        return {'status': False, 'error': str(e)}
        
# GET ALL POLICE DEPARTMENTS WITH SEARCH AND PAGINATION
class getAllPoliceDepartment(Resource):
    def post(self):
        try:
            data = request.get_json() or {}
            items_per_page = data.get('items_per_page', None)
            page = data.get('page', 1)
            name = data.get('name', None)
            county = data.get('county', None)

            # Query active police departments excluding internal Deemsys accounts
            query = PoliceDepartmentModel.query.filter(
                PoliceDepartmentModel.status == 1,
                ~PoliceDepartmentModel.name.ilike('%deemsys%'),
                ~PoliceDepartmentModel.code.ilike('%deemsys%')
            )
            if name:
                query = query.filter(PoliceDepartmentModel.name.ilike(f"%{name}%"))
            if county:
                query = query.filter(PoliceDepartmentModel.county_id == county)

            count = query.count()
            if items_per_page is None or items_per_page == "":
                items_per_page = count if count > 0 else 10
            else:
                items_per_page = int(items_per_page)

            page = int(page) if str(page).isdigit() else 1
            offset = (page - 1) * items_per_page
            police = query.limit(items_per_page).offset(offset).all()
            result = []
            for d in police:
                police_data = {
                    'department_id': d.police_department_id,
                    'county_id': d.county_id,
                    'county_name': d.county.name if d.county else None,
                    'name': d.name,
                    'status': d.county.status if d.county else None,
                    'code': d.code,
                    'login_link': d.login_link,
                    'search_link': d.search_link,
                    'status': d.status,
                    'url': get_police_banner_url(d.police_department_id),
                    'is_enabled': d.is_enabled,
                    'viewLoginLink': CRMAppDomain + "" + (d.login_link or ""),
                    'viewSearchLink': CRMAppDomain + "" + (d.search_link or ""),
                }
                result.append(police_data)
            return jsonify({'status': True, 'data': result, 'count': count})
        except Exception as e:
            return jsonify({'status': False, 'error': str(e)})
    
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
                    'url': get_police_banner_url(data.police_department_id),
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
                    'url': get_police_banner_url(data.police_department_id),
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
                data = request.form
                police.county_id = data.get('county_id')
                police.name = data.get('name')
                police.code = data.get('code')
                image = request.files.get('image')
                file_url = get_police_banner_url(police.police_department_id)
                if image and allowed_file(image.filename):
                    file_url = upload_image_to_s3(image, police.police_department_id, "banner.jpg")
                db.session.commit()
                return jsonify({'status': True, 'msg': 'Updated Police Department Details', 'data': {**data, 'url': file_url}})
            return jsonify({'status': False, 'msg': 'Police Department not found'})
        except Exception as e:
            return jsonify({'status': False, 'error': str(e)})

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
                    'url': get_police_banner_url(account.police_dep_id.police_department_id),
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


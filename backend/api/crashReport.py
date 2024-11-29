from io import BytesIO
import os
import uuid
import boto3
from flask import Flask, app, request, jsonify, Blueprint
import requests
from models import CrashReports, Occupants, PoliceDepartmentModel, Users,Accounts,CrashReportRestriction
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity
from db import db
from config import AWSCredentials,CROCredentials
from datetime import datetime
from test import role_required,get_property
from sqlalchemy import and_, func,or_
s3 = boto3.client(
    's3',
    aws_access_key_id=AWSCredentials["AWS_ACCESS_KEY"],
    aws_secret_access_key=AWSCredentials["AWS_SECRET_ACCESS_KEY"]
)

def generate_short_uuid():
    uuid_obj = uuid.uuid4()
    uuid_str = uuid_obj.hex
    short_uuid = uuid_str[:8] + uuid_str[8:12] + uuid_str[12:16] + uuid_str[16:20] + uuid_str[20:]
    return short_uuid

def upload_file_to_s3(file, police_department_id, report_id):
    object_key = f'runner-reports/{police_department_id}/reports/{report_id}.pdf'

    # Check if the file already exists
    try:
        s3.head_object(Bucket=AWSCredentials['PUBLIC_BUCKET_NAME'], Key=object_key)
        # If the file exists, delete it
        s3.delete_object(Bucket=AWSCredentials['PUBLIC_BUCKET_NAME'], Key=object_key)
    except s3.exceptions.ClientError as e:
        # If the file does not exist, continue without any action
        if e.response['Error']['Code'] != '404':
            raise

    # Upload the new file
    s3.upload_fileobj(
        Fileobj=file,
        Bucket=AWSCredentials['PUBLIC_BUCKET_NAME'],
        Key=object_key,
        ExtraArgs={'ContentType': 'application/pdf'}
    )

    return f'https://{AWSCredentials["PUBLIC_BUCKET_NAME"]}.s3.amazonaws.com/{object_key}'

app = Flask(__name__)
# Configure upload folder
app.config['UPLOAD_FOLDER'] = 'file:///C:/wamp64/www/SaveCrashReports'  # Change to your WAMP server path
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max upload size (optional)
# Allowed file extensions for validation (optional)
ALLOWED_EXTENSIONS = {'pdf'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
class CreateCrashReport(Resource):
    def post(self):
        value = {
            "report_id": generate_short_uuid(),
            "account_id": request.form.get('account_id'),
            "police_department_id": request.form.get('police_department_id'),
            "report_number": request.form.get('report_number'),
            "crash_date": request.form.get('crash_date'),
            "location": request.form.get('location'),
            "county_id": request.form.get('county_id'),
            "crash_severity": request.form.get('crash_severity'),
            "no_of_occupants": int(request.form.get('no_of_occupants')),
            "status": 1
        }
        occupants_list = []
        for i in range(value["no_of_occupants"]):
            occupant = {
                "first_name": request.form.get(f'occupantsForms[{i}][first_name]'),
                "last_name": request.form.get(f'occupantsForms[{i}][last_name]'),
                "injuries": request.form.get(f'occupantsForms[{i}][injuries]'),
                "seating_position": request.form.get(f'occupantsForms[{i}][seating_position]'),
                "sequence_no": request.form.get(f'occupantsForms[{i}][sequence_no]'),
                "status": request.form.get(f'occupantsForms[{i}][status]')
            }
            occupants_list.append(occupant)
        try:
            # file upload for production
            # file_url = upload_file_to_s3(crash_report_file, value['police_department_id'], value['report_id'])
            if 'crashReportFile' not in request.files:
                return jsonify({'error': 'No file part in the request'})
            crash_report_file = request.files['crashReportFile']
            if not allowed_file(crash_report_file.filename):
                return jsonify({'error': 'Invalid file type. Only PDF files are allowed.'})
            filename = f"{value['report_id']}.pdf" 
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
            crash_report_file.save(save_path)
            value['file_name'] = f'{value["report_id"]}.pdf'
            crash_report = CrashReports(**value)
            crash_report.save_to_crash_reports()
            for occupant in occupants_list:
                occupants_data = Occupants(
                report_id=value['report_id'],
                first_name=occupant['first_name'],
                last_name=occupant['last_name'],
                injuries=occupant['injuries'],
                seating_position=occupant['seating_position'],
                sequence_no=occupant['sequence_no'],
                status=occupant['status']
                )
                occupants_data.save_to_users()
            data = {
                "report_number": crash_report.report_number,
                "crash_date": crash_report.crash_date,
                "county_id": crash_report.county_id,
                "no_of_occupants": crash_report.no_of_occupants,
                "file_path": f'{crash_report.report_id}.pdf',
                "save_path":save_path,
                "is_runner_report": 1,
                "police_department_id": crash_report.police_department_id,
                "report_id": crash_report.report_id,
                "status": 1,
                "account_id": crash_report.account_id,
                "location": crash_report.location,
                "crash_severity": crash_report.crash_severity,
                "occupants": [
                    {
                        "report_number": crash_report.report_number,
                        "county_id": crash_report.county_id,
                        "crash_date": crash_report.crash_date,
                        "name": f"{occupant['first_name']} {occupant['last_name']}" if occupant['first_name'] else None,
                        "injuries": occupant['injuries'],
                        "seating_position": occupant['seating_position'],
                        "is_owner": 0,
                        "patient_status": 1,
                        "is_runner_report": 1,
                        "status": occupant['status'],
                        "crash_severity": crash_report.crash_severity,
                    }
                    for occupant in occupants_list
                ]
            }

        
            # # Prepare headers
            # headers = {
            #         'Content-Type': 'application/json'
            # }
            # # URL to which the GET request is sent
            # url = get_property("CROCredentials") + get_property("saveCrashReportsAndPatients")
            # # Make POST request using requests module
            # response = requests.post(url, json=data, headers=headers)
            # # Check response status and return result
            # if response:
            return jsonify({'status': True,'msg': 'Crash Report Added Successfully','data':data})
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'msg': 'Error saving data to database', 'error': str(e)})

# Get All Crash Reports
class GetAllCrashReports(Resource):
    @role_required('ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER')
    def post(self):
        try:
            requestDetails = request.get_json()
            page = requestDetails.get('page', 1)
            itemsPerPage = requestDetails.get('itemsPerPage', 10)
            accountId = requestDetails.get('accountId')
            reportNumber = requestDetails.get('reportNumber')
            crashDate = requestDetails.get('crashDate')
            firstName = requestDetails.get('firstName')
            lastName = requestDetails.get('lastName')
            location = requestDetails.get('location')
            addedOnFromDate = requestDetails.get('addedOnFromDate')
            addedOnToDate = requestDetails.get('addedOnToDate')
            searchType = requestDetails.get('searchType')
            reportType = requestDetails.get('reportType')
            countyId = requestDetails.get('countyId')
            policeDepartmentId = requestDetails.get('policeDepartmentId')

            query = CrashReports.query
            user = Users.query.filter_by(username=get_jwt_identity()).first()
            if reportType == 1 and policeDepartmentId=="" and user:
                accountId = user.account_id
            elif reportType == 2 and user.role_id==2:
                accountDetail = Accounts.query.filter_by(account_id=user.account_id).first()
                if accountDetail:
                    policeDepartmentId = accountDetail.police_department_id
            if accountId and accountId != "0":
                query = query.filter(CrashReports.account_id == accountId)
            if reportNumber:
                query = query.filter(CrashReports.report_number.ilike(f'%{reportNumber}%'))
            if crashDate:
                query = query.filter(CrashReports.crash_date == crashDate)
            if firstName:
                query = query.join(CrashReports.occupants).filter(Occupants.first_name.ilike(f'%{firstName}%'))
            if lastName:
                query = query.join(CrashReports.occupants).filter(Occupants.last_name.ilike(f'%{lastName}%'))
            if location:
                query = query.filter(CrashReports.location.ilike(f'%{location}%'))
            if countyId:
                query = query.filter(CrashReports.county_id == countyId)
            if policeDepartmentId and policeDepartmentId is not None:
                query = query.join(CrashReports.police).filter(PoliceDepartmentModel.police_department_id == policeDepartmentId)
            if addedOnFromDate:
                from_date = datetime.strptime(addedOnFromDate, '%Y-%m-%d')
                query = query.filter(CrashReports.added_date >= from_date)
            if addedOnToDate:
                to_date = datetime.strptime(addedOnToDate, '%Y-%m-%d')
                query = query.filter(CrashReports.added_date <= to_date) 
            # Apply pagination
            offset = (page - 1) * itemsPerPage
            crash_report_details = query.limit(itemsPerPage).offset(offset).all()
            count = query.count()
            report_list = []
            for crash in crash_report_details:
                occupants = Occupants.query.filter_by(report_id =crash.report_id).all()
                occupants_forms = [{
                    "occupants_id": occupant.occupants_id,
                    "report_id": occupant.report_id,
                    "first_name": occupant.first_name,
                    "last_name": occupant.last_name,
                    "injuries": occupant.injuries,
                    "seating_position": occupant.seating_position,
                    "sequence_no": occupant.sequence_no,
                    "status": occupant.status
                } for occupant in occupants]

                report_data = {
                    "report_id": crash.report_id,
                    "account_id": crash.account_id,
                    "police_department": crash.police.name,
                    "report_number": crash.report_number,
                    "crash_date": crash.crash_date,
                    "location": crash.location,
                    "county_id": crash.county_id,
                    "crash_severity": crash.crash_severity,
                    "no_of_occupants": crash.no_of_occupants,
                    # "file_name": f'{AWSCredentials["S3StorageLinkForimages"]}{crash.police_department_id}/reports/{crash.report_id}.pdf',
                    'file_name':f"{app.config['UPLOAD_FOLDER']}/{crash.report_id}.pdf",
                    "added_date": crash.added_date,
                    "added_date_time": crash.added_date_time,
                    "status": crash.status,
                    "occupantsForms": occupants_forms
                }

                report_list.append(report_data)

            return jsonify({'data': report_list, 'status': True, 'total': count,})
        except Exception as e:
            return jsonify({'status': False, 'message': str(e)})

# Search Crash Report for All User
class SearchCrashReportAllUser(Resource):
    def post(self):
        requestDetails = request.get_json()
        page = requestDetails.get('page', 1)
        itemsPerPage = requestDetails.get('itemsPerPage', 10)
        reportNumber = requestDetails.get('reportNumber')
        crashDate = requestDetails.get('crashDate')
        firstName = requestDetails.get('firstName')
        lastName = requestDetails.get('lastName')
        location = requestDetails.get('location')

            # Base query joining CrashReports and Occupants
        query = CrashReports.query

        # Filtering conditions for CrashReports
        conditions = []
        if reportNumber:
            conditions.append(CrashReports.report_number == reportNumber)
        if crashDate:
            conditions.append(CrashReports.crash_date == crashDate)
        if location:
            # Use func.lower() for case-insensitive matching
            conditions.append(func.lower(CrashReports.location) == location.lower())

        # Apply CrashReports filters
        if conditions:
            query = query.filter(and_(*conditions))

        # Join with Occupants and filter only if both firstName and lastName are provided
        if firstName and lastName:
            query = query.join(Occupants, Occupants.report_id == CrashReports.report_id)
            query = query.filter(
                and_(
                    func.lower(Occupants.first_name) == firstName.lower(),
                    func.lower(Occupants.last_name) == lastName.lower()
                )
            )
        # Paginate the results
        result = query.paginate(page=page, per_page=itemsPerPage, error_out=False)
        # Prepare the response data
        report_list = []
        for crash in result.items:  # Use `result.items` for paginated results
            occupants = Occupants.query.filter(
                and_(
                    Occupants.report_id == crash.report_id,
                    func.lower(Occupants.first_name) == firstName.lower(),
                    func.lower(Occupants.last_name) == lastName.lower()
                )
            ).all()
            
            occupants_forms = [{
                "occupants_id": occupant.occupants_id,
                "report_id": occupant.report_id,
                "first_name": occupant.first_name,
                "last_name": occupant.last_name,
                "injuries": occupant.injuries,
                "seating_position": occupant.seating_position,
                "sequence_no": occupant.sequence_no,
                "status": occupant.status
            } for occupant in occupants]
            report_data = {
                "report_id": crash.report_id,
                "account_id": crash.account_id,
                "police_department": crash.police.name if crash.police else None,
                "report_number": crash.report_number,
                "crash_date": crash.crash_date,
                "location": crash.location,
                "county_id": crash.county_id,
                "crash_severity": crash.crash_severity,
                "no_of_occupants": crash.no_of_occupants,
                # "file_name": f'{AWSCredentials["S3StorageLinkForimages"]}{crash.police_department_id}/reports/{crash.report_id}.pdf',
                'file_name':f"{app.config['UPLOAD_FOLDER']}/{crash.report_id}.pdf",
                "added_date": crash.added_date,
                "added_date_time": crash.added_date_time,
                "status": crash.status,
                "occupantsForms": occupants_forms
            }

            report_list.append(report_data)

        return jsonify({
            'data': report_list,
            'status': True,
            'total': result.total,  # Total records in the query
            'pages': result.pages  # Total pages
        })

class GetCrashReportById(Resource):
    def get(self,id):
        data=CrashReports.query.filter_by(report_id=id).first()
        occupant_data = Occupants.query.filter_by(report_id =data.report_id).all()
        occupants_list=[]
        for occupant in occupant_data:
                occupants_data = {
                "report_id":occupant.report_id,
                "first_name":occupant.first_name,
                "last_name":occupant.last_name,
                "injuries":occupant.injuries,
                "seating_position":occupant.seating_position,
                "sequence_no":occupant.sequence_no,
                "status":occupant.status
                }
                occupants_list.append(occupants_data)
        crashReport={
            "report_id":data.report_id,
            "account_id": data.account_id,
            "police_department_id": data.police_department_id,
            "report_number": data.report_number,
            "crash_date": data.crash_date,
            "location": data.location,
            "county_id": data.county_id,
            "countyName":data.county.name,
            "crash_severity": data.crash_severity,
            "no_of_occupants": data.no_of_occupants,
            # "file_name": f'{AWSCredentials["S3StorageLinkForimages"]}{data.police_department_id}/reports/{data.report_id}.pdf',
            'file_name':f"{app.config['UPLOAD_FOLDER']}/{data.report_id}.pdf",
            "added_date": data.added_date,
            "added_date_time": data.added_date_time,
            "status": data.status,
            "occupants":occupants_list
        }
        return jsonify({'data': crashReport, 'status': True})

# Update crash report by id
class UpdateCrashReport(Resource):
    def put(self, id):
        try:
            crash_report = CrashReports.query.filter_by(report_id=id).first()
            if not crash_report:
                return jsonify({'msg': 'Crash Report not found', 'status': False})
            occupant = int(request.form.get('no_of_occupants'))
            crash_report.account_id = request.form.get('account_id')
            crash_report.police_department_id = request.form.get('police_department_id')
            crash_report.report_number = request.form.get('report_number')
            crash_report.crash_date = request.form.get('crash_date')
            crash_report.location = request.form.get('location')
            crash_report.county_id = request.form.get('county_id')
            crash_report.crash_severity = request.form.get('crash_severity')
            crash_report.no_of_occupants = occupant
            occupants_list = []
            for i in range(occupant):
                first_name = request.form.get(f'occupantsForms[{i}][first_name]')
                if not first_name:
                    break
                occupant = {
                    "first_name": first_name,
                    "last_name": request.form.get(f'occupantsForms[{i}][last_name]'),
                    "injuries": request.form.get(f'occupantsForms[{i}][injuries]'),
                    "seating_position": request.form.get(f'occupantsForms[{i}][seating_position]'),
                    "sequence_no": request.form.get(f'occupantsForms[{i}][sequence_no]'),
                    "status": request.form.get(f'occupantsForms[{i}][status]')
                }
                occupants_list.append(occupant)
            if 'crashReportFile' in request.files:
                crash_report_file = request.files['crashReportFile']
                # file_url = upload_file_to_s3(crash_report_file, crash_report.police_department_id, crash_report.report_id)
                if not allowed_file(crash_report_file.filename):
                    return jsonify({'error': 'Invalid file type. Only PDF files are allowed.'})
                # Example: Extract report_id from the request or form data
                report_id = crash_report.report_id
                if not report_id:
                    return jsonify({'error': 'Missing report ID'})
                filename = f"{report_id}.pdf"
                save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                # Ensure the directory exists
                os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
                # Save or replace the file
                crash_report_file.save(save_path)
                crash_report.file_name = f'{crash_report.report_id}.pdf'
            else:
                crash_report.file_name = f'{crash_report.report_id}.pdf'
            occupants_to_delete = Occupants.query.filter_by(report_id=id).all()
            for occupant in occupants_to_delete:
                db.session.delete(occupant)           
                db.session.commit()
            for occupant in occupants_list:
                occupants_data = Occupants(
                report_id=crash_report.report_id,
                first_name=occupant['first_name'],
                last_name=occupant['last_name'],
                injuries=occupant['injuries'],
                seating_position=occupant['seating_position'],
                sequence_no=occupant['sequence_no'],
                status=occupant['status']
                )
                occupants_data.save_to_users()
                value={
                    "report_id": crash_report.report_id,
                    "account_id": crash_report.account_id,
                    "police_department_id": crash_report.police_department_id,
                    "report_number": crash_report.report_number,
                    "crash_date": crash_report.crash_date,
                    "location": crash_report.location,
                    "county_id": crash_report.county_id,
                    "crash_severity": crash_report.crash_severity,
                    "no_of_occupants": crash_report.no_of_occupants,
                    # "file_name": f'https://{AWSCredentials["PUBLIC_BUCKET_NAME"]}.s3.amazonaws.com/{crash_report.police_department_id}/reports/{crash_report.report_id}.pdf',
                    'file_name':f"{app.config['UPLOAD_FOLDER']}/{crash_report.report_id}.pdf",
                    "added_date": crash_report.added_date,
                    "added_date_time": crash_report.added_date_time,
                    "status": crash_report.status,}
                return jsonify({'msg': 'Crash Report Updated Successfully', "status":True,"data":value})
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'msg': 'Error updating data to database', 'error': str(e)})

# Delete Crash Report by id
class DeleteCrashReport(Resource):
    def get(self,id):
        crash_report=CrashReports.query.filter_by(report_id=id).first()
        object_key = f'runner-reports/{crash_report.police_department_id}/reports/{crash_report.report_id}.pdf'

        try:
            s3.head_object(Bucket=AWSCredentials['PUBLIC_BUCKET_NAME'], Key=object_key)
        # If the file exists, delete it
            s3.delete_object(Bucket=AWSCredentials['PUBLIC_BUCKET_NAME'], Key=object_key)
        except s3.exceptions.ClientError as e:
        # If the file does not exist, continue without any action
            if e.response['Error']['Code'] != '404':
             raise
        try:
            occupants_to_delete = Occupants.query.filter_by(report_id=id).all()
            for occupant in occupants_to_delete:
                db.session.delete(occupant)
            db.session.delete(crash_report)
            db.session.commit()
            return {'message': 'Crash report deleted successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error deleting record from the database: {str(e)}'}, 500

class checkReportNumberExist(Resource):
    def post(self):
         requestDetails = request.get_json()
         reportNumber=requestDetails.get('report_number')
         reportId=requestDetails.get('report_id')
         query = CrashReports.query
         if reportId!="":
            query = query.filter(CrashReports.report_id != reportId)
         crash_report = query.filter_by(report_number=reportNumber).first()
         if crash_report:
             return jsonify({'status':False,'isExist':1,'message':'Report Number Already Exist'})
         else:
             return jsonify({'status':True,'isExist':0,'message':'Report Number not Exist'})

# to save client Ip in crash report restriction table
class SaveClientIPInCrashReportRestriction(Resource):
    def post(self):
        # Get the client IP address
        client_ip = request.remote_addr
        print(f"Client IP address: {client_ip}")
        
        # Parse the request JSON
        request_details = request.get_json()
        report_id = request_details.get('report_id')

        # Ensure the report_id is not empty
        if report_id:
            # Query the CrashReports table
            crash_report = CrashReports.query.filter_by(report_id=report_id).first()

            if crash_report:
                # Check if the client IP already exists in CrashReportRestriction
                existing_client = CrashReportRestriction.query.get(client_ip)
                
                if existing_client:
                    # Update the last access time if the client IP exists
                    existing_client.last_access_time = datetime.now()
                    db.session.commit()
                else:
                    # Create a new CrashReportRestriction entry if the client IP doesn't exist
                    crash_report_restriction = CrashReportRestriction(client_ip=client_ip, last_access_time=datetime.now())
                    db.session.add(crash_report_restriction)
                    db.session.commit()

                return jsonify({"reportStatus": 1, "requestSuccess": True})
            else:
                return jsonify({"reportStatus": 0, "requestSuccess": False, "message": "Report ID not found"})
        else:
            return jsonify({"reportStatus": 0, "requestSuccess": False, "message": "Invalid or missing report ID"})


CrashReport_Blueprint = Blueprint('crash_reports', __name__)
api = Api(CrashReport_Blueprint)
api.add_resource(CreateCrashReport, '/createCrashReport')
api.add_resource(GetAllCrashReports, '/getAllCrashReports')
api.add_resource(GetCrashReportById,'/getCrashReportById/<id>')
api.add_resource(UpdateCrashReport,'/updateCrashReport/<id>')
api.add_resource(DeleteCrashReport,'/deleteCrashReport/<id>')
api.add_resource(checkReportNumberExist,'/checkReportNumberExist')
api.add_resource(SearchCrashReportAllUser,'/searchCrashReportAllUser')
api.add_resource(SaveClientIPInCrashReportRestriction,'/saveClientIPInCrashReportRestriction')
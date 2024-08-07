import uuid
import boto3
from flask import request, jsonify, Blueprint
from models import CrashReports, Occupants, PoliceDepartmentModel, Users
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import create_refresh_token, create_access_token, get_jwt_identity
from db import db
from config import AWSCredentials
from datetime import datetime
from test import role_required

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
            "no_of_occupants": request.form.get('no_of_occupants'),
            "status": 1
        }
        
        occupants_list = request.form.getlist('occupantsForms')
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
            db.session.add(occupants_data)
        
        if 'crashReportFile' not in request.files:
            return jsonify({'msg': 'crashReportFile not provided'}), 400

        crash_report_file = request.files['crashReportFile']

        try:
            file_url = upload_file_to_s3(crash_report_file, value['police_department_id'], value['report_id'])
            value['file_name'] = f'{value["report_id"]}.pdf'
            del value['crashReportFile']
            
            crash_report = CrashReports(**value)
            db.session.add(crash_report)
            db.session.commit()
            return jsonify({'msg': 'Crash Report Added Successfully', 'data': value})
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'msg': 'Error saving data to database', 'error': str(e)}), 500

# Get All Crash Reports
class GetAllCrashReports(Resource):
    # @role_required('ROLE_SUPER_ADMIN','ROLE_ADMIN','ROLE_USER')
    def post(self):
        requestDetails = request.get_json()
        page = requestDetails.get('page')
        itemsPerPage = requestDetails.get('itemsPerPage')
        accountId=requestDetails.get('accountId')
        reportNumber= requestDetails.get('reportNumber')
        crashDate= requestDetails.get('crashDate')
        firstName=requestDetails.get('firstName')
        lastName= requestDetails.get('lastName')
        location= requestDetails.get('location')
        addedOnFromDate= requestDetails.get('addedOnFromDate')
        addedOnToDate= requestDetails.get('addedOnToDate')
        searchType= requestDetails.get('searchType')
        reportType=requestDetails.get('reportType')
        countyId= requestDetails.get('countyId')
        policeDepartmentId=requestDetails.get('policeDepartmentId')
        query = CrashReports.query
        # if(reportType==1):
        #    user = Users.query.filter_by(username=get_jwt_identity()).first()
        #    if user:
        #         accountId = user.account_id
        if (accountId!="0"):
            query = query.filter_by(account_id=accountId)
        if (reportNumber!=""):
            query = query.filter_by(report_number=reportNumber)
        # Paginate crash reports
        if(crashDate!=""):
            query = query.filter_by(crash_date=crashDate)
        if(firstName!=""):
            query = query.join(CrashReports.occupants).filter(Occupants.first_name.ilike(f'%{firstName}%'))
        if(lastName!=""):
            query = query.join(CrashReports.occupants).filter(Occupants.last_name.ilike(f'%{lastName}%'))  
        if(location!=""):
            query = query.filter(location.ilike(f'%{location}%'))
        if(countyId!=""):
            query = query.filter_by(county_id=countyId)
        if(policeDepartmentId!="" and (policeDepartmentId) is not None):
            query = query.join(CrashReports.police).filter(PoliceDepartmentModel.police_department_id == policeDepartmentId)
        if (addedOnFromDate!=""):
            try:
                from_date = datetime.strptime(addedOnFromDate, '%Y-%m-%d')
                query = query.filter(CrashReports.added_date >= from_date)
            except ValueError:
                return jsonify({'message': 'Invalid date format for addedOnFromDate. Use YYYY-MM-DD.'}), 400
        if (addedOnToDate!=""):
            try:
                to_date = datetime.strptime(addedOnToDate, '%Y-%m-%d')
                query = query.filter(CrashReports.added_date <= to_date)
            except ValueError:
                return jsonify({'message': 'Invalid date format for addedOnToDate. Use YYYY-MM-DD.'}), 400
        
        data = query.paginate(page=page, per_page=itemsPerPage, error_out=False)
       
        report_list = []
        
        # Iterate through crash reports and add occupants
        for crash in data.items:
            # Use the relationship to get occupants for the current crash report
            occupants_forms = [{
                "occupants_id": occupant.occupants_id,
                "report_id": occupant.report_id,
                "first_name": occupant.first_name,
                "last_name": occupant.last_name,
                "injuries": occupant.injuries,
                "seating_position": occupant.seating_position,
                "sequence_no": occupant.sequence_no,
                "status": occupant.status
            } for occupant in crash.occupants]
            
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
                "file_name": f'https://{AWSCredentials["PUBLIC_BUCKET_NAME"]}.s3.amazonaws.com/{crash.police_department_id}/reports/{crash.report_id}.pdf',
                "added_date": crash.added_date,
                "added_date_time": crash.added_date_time,
                "status": crash.status,
                "occupantsForms": occupants_forms  # Add occupants data here
            }
            
            report_list.append(report_data)       
        return jsonify({'data': report_list, 'status': True, 'total': data.total, 'pages': data.pages})

class GetCrashReportById(Resource):
    def get(self,id):
        data=CrashReports.query.filter_by(report_id=id).first()
        crashReport={
            "report_id":data.report_id,
            "account_id": data.account_id,
            "police_department_id": data.police_department_id,
            "report_number": data.report_number,
            "crash_date": data.crash_date,
            "location": data.location,
            "county_id": data.county_id,
            "crash_severity": data.crash_severity,
            "no_of_occupants": data.no_of_occupants,
            "file_name": f'https://{AWSCredentials["PUBLIC_BUCKET_NAME"]}.s3.amazonaws.com/{data.police_department_id}/reports/{data.report_id}.pdf',
            "added_date": data.added_date,
            "added_date_time": data.added_date_time,
            "status": data.status,
        }
        return jsonify({'data': crashReport, 'status': True})

class UpdateCrashReport(Resource):
    def put(self, id):
        crash_report = CrashReports.query.filter_by(report_id=id).first()
        if not crash_report:
            return jsonify({'msg': 'Crash Report not found', 'status': False}), 404

        crash_report.account_id = request.form.get('account_id')
        crash_report.police_department_id = request.form.get('police_department_id')
        crash_report.report_number = request.form.get('report_number')
        crash_report.crash_date = request.form.get('crash_date')
        crash_report.location = request.form.get('location')
        crash_report.county_id = request.form.get('county_id')
        crash_report.crash_severity = request.form.get('crash_severity')
        crash_report.no_of_occupants = request.form.get('no_of_occupants')

        occupants_list = request.form.getlist('occupantsForms')
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
            db.session.add(occupants_data)

        if 'crashReportFile' not in request.files:
            return jsonify({'msg': 'crashReportFile not provided'}), 400

        crash_report_file = request.files['crashReportFile']
        try:
            file_url = upload_file_to_s3(crash_report_file, crash_report.police_department_id, crash_report.report_id)
            crash_report.file_name = f'{crash_report.report_id}.pdf'
            db.session.commit()
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
                "file_name": f'https://{AWSCredentials["PUBLIC_BUCKET_NAME"]}.s3.amazonaws.com/{crash_report.police_department_id}/reports/{crash_report.report_id}.pdf',
                "added_date": crash_report.added_date,
                "added_date_time": crash_report.added_date_time,
                "status": crash_report.status,}
            return jsonify({'msg': 'Crash Report Updated Successfully', "status":True,"data":value})
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'msg': 'Error updating data to database', 'error': str(e)}), 500

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
        

CrashReport_Blueprint = Blueprint('crash_reports', __name__)
api = Api(CrashReport_Blueprint)
api.add_resource(CreateCrashReport, '/createCrashReport')
api.add_resource(GetAllCrashReports, '/getAllCrashReports')
api.add_resource(GetCrashReportById,'/getCrashReportById/<id>')
api.add_resource(UpdateCrashReport,'/updateCrashReport/<id>')
api.add_resource(DeleteCrashReport,'/deleteCrashReport/<id>')

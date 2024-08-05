import uuid
import boto3
from flask import request, jsonify, Blueprint
from models import CrashReports, Occupants,PoliceDepartmentModel
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from db import db
from config import AWSCredentials
from datetime import datetime
s3 = boto3.client(
    's3',
    aws_access_key_id=AWSCredentials["AWS_ACCESS_KEY"],
    aws_secret_access_key=AWSCredentials["AWS_SECRET_ACCESS_KEY"]
)

# Create Crash Reports
class CreateCrashReport(Resource):
    def generate_short_uuid(self):
        uuid_obj = uuid.uuid4()
        uuid_str = uuid_obj.hex
        short_uuid = uuid_str[:8] + uuid_str[8:12] + uuid_str[12:16] + uuid_str[16:20] + uuid_str[20:]
        return short_uuid

    def post(self):
        # Get image data from payload
        value = {
            "report_id": self.generate_short_uuid(),
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
        occupantsList =request.form.get('occupantsForms', [])
        for occupant in occupantsList:
            print(occupant, "Processing occupant")
            occupantsData = Occupants(
                report_id=value['report_id'],
                first_name=occupant['first_name'],
                last_name=occupant['last_name'],
                injuries=occupant['injuries'],
                seating_position=occupant['seating_position'],
                sequence_no=occupant['sequence_no'],
                status=occupant['status']
            )
            db.session.add(occupantsData)
        
        if 'crashReportFile' not in request.files:
            return 'crashReportFile not provided', 400

        crashReportFile = request.files['crashReportFile']
        value['crashReportFile'] = crashReportFile

        try:
            upload_result = self.upload_file_to_s3(value)
            db.session.commit()  # Commit the crash report after S3 upload
            return upload_result
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'msg': 'Error saving data to database', 'error': str(e)}), 500

    def upload_file_to_s3(self, value):
        def upload_image(value):
            object_key = f'{value["police_department_id"]}/reports/{value["report_id"]}.pdf'
            s3.upload_fileobj(
                Fileobj=value['crashReportFile'],
                Bucket=AWSCredentials['PUBLIC_BUCKET_NAME'],
                Key=object_key,
                ExtraArgs={'ContentType': 'application/pdf'}
            )
            return f'https://{AWSCredentials["PUBLIC_BUCKET_NAME"]}.s3.amazonaws.com/{object_key}', object_key

        fileurl, file = upload_image(value)
        value['file_name'] = f'{value["report_id"]}.pdf'
        del value['crashReportFile']
        
        crash_report = CrashReports(**value)
        db.session.add(crash_report)
        db.session.commit()
        return jsonify({'msg': 'Crash Report Added Successfully', 'data': value})

# Get All Crash Reports
class GetAllCrashReports(Resource):
    def post(self):
        requestDetails = request.get_json()
        page = requestDetails.get('page', 1)
        itemsPerPage = requestDetails.get('itemsPerPage', 10)
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
        print(accountId,reportNumber)
        query = CrashReports.query
        if (accountId!=""):
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
        
        print(query)
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

CrashReport_Blueprint = Blueprint('crash_reports', __name__)
api = Api(CrashReport_Blueprint)
api.add_resource(CreateCrashReport, '/createCrashReport')
api.add_resource(GetAllCrashReports, '/getAllCrashReports')

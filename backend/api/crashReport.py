import uuid
import boto3
from flask import request, jsonify, Blueprint
from models import CrashReports, Occupants
from flask_restful import Api, Resource
from sqlalchemy.exc import SQLAlchemyError
from db import db
from config import AWSCredentials

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

        # Paginate crash reports
        data = CrashReports.query.paginate(page=page, per_page=itemsPerPage, error_out=False)
       
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
                "police_department_id": crash.police_department_id,
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

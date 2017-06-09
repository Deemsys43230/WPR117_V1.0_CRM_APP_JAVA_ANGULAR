package com.deemsys.project.common;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

public class CRMConstants {
	
	public static Integer CRM_ADMIN_ROLE_ID=1;
	public static Integer CRM_USER_ROLE_ID=2;
	public static Integer CRM_SUPER_ADMIN_ID=3;
	
	public static String CRM_ADMIN_ROLE="ROLE_ADMIN";
	public static String CRM_USER_ROLE="ROLE_USER";
	public static String CRM_SUPER_ADMIN="ROLE_SUPER_ADMIN";
	
	// Login Additional Parameter Name
	public static String DEPARTMENT_PARAMETER="department";
	public static String USERNAME_DELIMETER=":";
	public static String USERNAME_PARAMETER="username";
	
	// Convert Year Format
	public static Date convertYearFormat(String date)
	{   SimpleDateFormat monthFormat = new SimpleDateFormat("MM/dd/yyyy");
		SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date dateformat=new Date();
		try {
			dateformat = monthFormat.parse(date);
			dateformat=yearFormat.parse(yearFormat.format(dateformat));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dateformat;
	}
	
	// Convert Date to USA Date Format
	public static Date convertDatetoUSDateFormat(Date date)
	{
	SimpleDateFormat DateTimeFormat=new SimpleDateFormat("yyyy-MM-dd");
	SimpleDateFormat DateFormat=new SimpleDateFormat("MM/dd/yyyy");

		Date dateformat=new Date();
		try {
			dateformat = DateTimeFormat.parse(DateTimeFormat.format(date));
			dateformat=DateFormat.parse(DateFormat.format(dateformat));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dateformat;
	}
	
	// Convert Month Format
	public static String convertMonthFormat(Date date)
	{   
		String convertedDate="";
		SimpleDateFormat monthFormat = new SimpleDateFormat("MM/dd/yyyy");
		SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date dateformat=new Date();
		try {
			if(date!=null){
				dateformat =yearFormat.parse(yearFormat.format(date));
				convertedDate=monthFormat.format(dateformat);
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return convertedDate;
	}

	// Convert To USA Month Format With Time
	public static String convertUSAFormatWithTime(Date date)
	{
		SimpleDateFormat monthFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss aa");
		Date dateformat=new Date();
		try {
			dateformat =yearFormat.parse(yearFormat.format(date));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return monthFormat.format(dateformat);
	}
	
	// Convert To Year Format With Time
	public static Date convertYearFormatWithTime(String date)
	{
		  SimpleDateFormat monthFormat = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss aa");
		SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date dateformat=new Date();
		try {
			dateformat = monthFormat.parse(date);
			dateformat=yearFormat.parse(yearFormat.format(dateformat));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dateformat;
	}
	
	public static Date convertYearFormatWithTime24Hr(String date)
	{
		  SimpleDateFormat monthFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date dateformat=new Date();
		try {
			dateformat = monthFormat.parse(date);
			dateformat=yearFormat.parse(yearFormat.format(dateformat));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dateformat;
	}
	
	// Convert To USA Month Format With Time
	public static String convertUSAFormatWithTimeAMPM(String date)
	{
		String convertedDateTime="";
		SimpleDateFormat monthFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		SimpleDateFormat frontMonthFormat = new SimpleDateFormat("MM/dd/yyyy hh:mm:ss aa");
		Date dateformat=new Date();
		try {
			if(date!=null && !date.equals("")){
				dateformat=monthFormat.parse(date);
				convertedDateTime=frontMonthFormat.format(dateformat);
			}
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return convertedDateTime;
	}
	
	// Upload PDF Files In Temp Folder
	public static void uploadPDFFiles(MultipartFile pdffile,String filePath) throws IOException{
		
		InputStream inputStream=null;
		try {
			
			byte[] bytes = pdffile.getBytes();
			inputStream = new ByteArrayInputStream(bytes);
		 BufferedOutputStream bostream =
                 new BufferedOutputStream(new FileOutputStream(new File(filePath)));
		 int read=0;
		 while((read=inputStream.read(bytes))!=-1){
			 bostream.write(bytes,0,read);
		 }
		 bostream.flush();
		 bostream.close();
		}catch(IOException e){
			throw e;
		}
	}
	
	public static File saveTemporaryFile(MultipartFile file,String filePath) throws IllegalStateException, IOException{
		//create a temp file
		File convFile = new File(filePath);
		file.transferTo(convFile);
        return convFile;
		
	}

	// Split User Name From Security Principal
	public static String splitUserName(String combinedUserName){
		String splittedUserName[]=combinedUserName.split(CRMConstants.USERNAME_DELIMETER);
		
		return splittedUserName[0];
	};
	
	public static String[] splitDepartmentId(String combinedUserName){
		String splittedUserName[]=combinedUserName.split(CRMConstants.USERNAME_DELIMETER);
		
		return splittedUserName;
	};
	
	// Get Crash Severity Text
	public static String getCrashSeverityText(Integer crashSeverity){
		String crashSeverityText="";
		switch (crashSeverity) {
		case 1:
			crashSeverityText="1 - FATAL";
			break;
		case 2:
			crashSeverityText="2 - INJURY";
			break;
		case 3:
			crashSeverityText="3 - PDO";
			break;
		case 4:
			crashSeverityText="X - NOT AVAILABLE";
			break;
		default:
			crashSeverityText="";
			break;
		}
		return crashSeverityText;
	}
	
	// Get Injuries Text
	public static String getInjuriesText(String injury){
		String injuriesText="";
		Integer injuryCheck=0;
		if(injury!=null&&!injury.equals("")){
			injuryCheck=Integer.parseInt(injury);
		}
		
		switch (injuryCheck) {
		case 1:
			injuriesText="1 - NO INJURY / NONE REPORTED";
			break;
		case 2:
			injuriesText="2 - POSSIBLE";
			break;
		case 3:
			injuriesText="3 - NON-INCAPACITATING";
			break;
		case 4:
			injuriesText="4 - INCAPACITATING";
			break;
		case 5:
			injuriesText="5 - FATAL";
			break;
		case 6:
			injuriesText="X - NOT AVAILABLE";
			break;
		default:
			injuriesText="";
			break;
		}
		return injuriesText;
	}
	
	// Get Seating Position Text
	public static String getSeatingPositionText(String seatingPosition){
		String seatingPositionText="";
		Integer seatingPositionCheck=0;
		if(seatingPosition!=null&&!seatingPosition.equals("")){
			seatingPositionCheck=Integer.parseInt(seatingPosition);
		}
		
		switch (seatingPositionCheck) {
		case 1:
			seatingPositionText="1 - FRONT - LEFT SIDE (MOTORCYCLE DRIVER)";
			break;
		case 2:
			seatingPositionText="2 - FRONT - MIDDLE";
			break;
		case 3:
			seatingPositionText="3 - FRONT - RIGHT SIDE";
			break;
		case 4:
			seatingPositionText="4 - SECOND - LEFT SIDE (MOTORCYCLE PASSENGER)";
			break;
		case 5:
			seatingPositionText="5 - SECOND - MIDDLE";
			break;
		case 6:
			seatingPositionText="6 - SECOND - RIGHT SIDE";
			break;
		case 7:
			seatingPositionText="7 - THIRD - LEFT SIDE (MOTORCYCLE SIDE CAR)";
			break;
		case 8:
			seatingPositionText="8 - THIRD - MIDDLE";
			break;
		case 9:
			seatingPositionText="9 - THIRD - RIGHT SIDE";
			break;
		case 10:
			seatingPositionText="10 - SLEEPER SECTION OF CAB (TRUCK)";
			break;
		case 11:
			seatingPositionText="11 - PASSENGER IN OTHER ENCLOSED CARGO AREA (NON-TRAILING UNIT SUCH AS A BUS, PICK-UP WITH CAP)";
			break;
		case 12:
			seatingPositionText="12 - PASSENGER IN UNENCLOSED CARGO AREA";
			break;
		case 13:
			seatingPositionText="13 - TRAILING UNIT";
			break;
		case 14:
			seatingPositionText="14 - RIDING ON VEHICLE EXTERIOR (NON-TRAILING UNIT)";
			break;
		case 15:
			seatingPositionText="15 - NON-MOTORIST";
			break;
		case 16:
			seatingPositionText="16 - OTHER";
			break;
		case 17:
			seatingPositionText="99 - UNKNOWN";
			break;
		case 18:
			seatingPositionText="X - NOT AVAILABLE";
			break;
		default:
			seatingPositionText="";
			break;
		}
		return seatingPositionText;
	}
}

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
	
	public static String CRM_ADMIN_ROLE="ROLE_ADMIN";
	public static String CRM_USER_ROLE="ROLE_USER";
	
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

}

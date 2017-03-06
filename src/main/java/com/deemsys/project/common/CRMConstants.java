package com.deemsys.project.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CRMConstants {
	
	public static Integer CRM_ADMIN_ROLE_ID=1;
	public static Integer CRM_USER_ROLE_ID=2;
	
	public static String CRM_ADMIN_ROLE="ROLE_ADMIN";
	public static String CRM_USER_ROLE="ROLE_USER";
	
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
}

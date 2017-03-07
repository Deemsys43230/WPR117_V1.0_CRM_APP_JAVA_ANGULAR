package com.deemsys.project.crashreports;

import java.util.Date;

import com.deemsys.project.common.CRMConstants;


public class CrashReportSearchList {
	
	private String reportId;
	private String reportNumber;
	private String crashDate;
	private String location;
	private String addedDate;
	private String addedDateTime;
	private String firstName;
	private String lastName;
	private Integer status;
	private String fileName;
	public String getReportId() {
		return reportId;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public String getReportNumber() {
		return reportNumber;
	}
	public void setReportNumber(String reportNumber) {
		this.reportNumber = reportNumber;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getCrashDate() {
		return crashDate;
	}
	public void setCrashDate(Date crashDate) {
		this.crashDate = CRMConstants.convertMonthFormat(crashDate);
	}
	public String getAddedDate() {
		return addedDate;
	}
	public void setAddedDate(Date addedDate) {
		this.addedDate = CRMConstants.convertMonthFormat(addedDate);
	}
	public String getAddedDateTime() {
		return addedDateTime;
	}
	public void setAddedDateTime(Date addedDateTime) {
		this.addedDateTime = CRMConstants.convertUSAFormatWithTime(addedDateTime);
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public CrashReportSearchList(String reportId, String reportNumber,
			String crashDate, String location, String addedDate, String addedDateTime,
			String firstName, String lastName, Integer status, String fileName) {
		super();
		this.reportId = reportId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.location = location;
		this.addedDate = addedDate;
		this.addedDateTime = addedDateTime;
		this.firstName = firstName;
		this.lastName = lastName;
		this.status = status;
		this.fileName = fileName;
	}
	public CrashReportSearchList() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

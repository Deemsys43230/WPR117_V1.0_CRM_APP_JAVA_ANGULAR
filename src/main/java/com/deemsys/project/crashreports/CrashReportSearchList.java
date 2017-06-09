package com.deemsys.project.crashreports;

import java.util.Date;

import com.deemsys.project.common.CRMConstants;


public class CrashReportSearchList {
	
	private String reportId;
	private String reportNumber;
	private String crashDate;
	private String location;
	private Integer countyId;
	private String countyName;
	private Integer crashSeverity;
	private String addedDate;
	private String addedDateTime;
	private String firstName;
	private String lastName;
	private String injuries;
	private String seatingPosition;
	private Integer status;
	private String fileName;
	private Integer noOfOccupants;
	private Integer departmentId;
	private String departmentName;
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
	public Integer getCountyId() {
		return countyId;
	}
	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
	}
	public String getCountyName() {
		return countyName;
	}
	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}
	public Integer getCrashSeverity() {
		return crashSeverity;
	}
	public void setCrashSeverity(Integer crashSeverity) {
		this.crashSeverity = crashSeverity;
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
	public String getInjuries() {
		return injuries;
	}
	public void setInjuries(String injuries) {
		this.injuries = injuries;
	}
	public String getSeatingPosition() {
		return seatingPosition;
	}
	public void setSeatingPosition(String seatingPosition) {
		this.seatingPosition = seatingPosition;
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
	public Integer getNoOfOccupants() {
		return noOfOccupants;
	}
	public void setNoOfOccupants(Integer noOfOccupants) {
		this.noOfOccupants = noOfOccupants;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	
	
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public CrashReportSearchList(String reportId, String reportNumber,
			String crashDate, String location, String addedDate, String addedDateTime,
			String firstName, String lastName, Integer status, String fileName,Integer noOfOccupants,Integer departmentId,String departmentName) {
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
		this.noOfOccupants = noOfOccupants;
		this.departmentId = departmentId;
		this.departmentName=departmentName;
		}
	public CrashReportSearchList() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

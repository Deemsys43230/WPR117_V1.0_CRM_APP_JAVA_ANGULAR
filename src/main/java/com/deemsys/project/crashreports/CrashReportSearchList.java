package com.deemsys.project.crashreports;

import java.util.Date;

import com.deemsys.project.common.CRMConstants;


public class CrashReportSearchList {
	
	private String reportId;
	private String reportNumber;
	private String crashDate;
	private Integer crashSeverity;
	private String address;
	private String phoneNumber;
	private String injuries;
	private String seatingPosition;
	private String atFaultInsuranceCompany;
	private String victimInsuranceCompany;
	private String countyName;
	private String location;
	private String addedDate;
	private String addedDateTime;
	private String firstName;
	private String lastName;
	private Integer status;
	private String fileName;
	private Integer noOfOccupants;
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
	public Integer getCrashSeverity() {
		return crashSeverity;
	}
	public void setCrashSeverity(Integer crashSeverity) {
		this.crashSeverity = crashSeverity;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
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
	public String getAtFaultInsuranceCompany() {
		return atFaultInsuranceCompany;
	}
	public void setAtFaultInsuranceCompany(String atFaultInsuranceCompany) {
		this.atFaultInsuranceCompany = atFaultInsuranceCompany;
	}
	public String getVictimInsuranceCompany() {
		return victimInsuranceCompany;
	}
	public void setVictimInsuranceCompany(String victimInsuranceCompany) {
		this.victimInsuranceCompany = victimInsuranceCompany;
	}
	public String getCountyName() {
		return countyName;
	}
	public void setCountyName(String countyName) {
		this.countyName = countyName;
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
	public Integer getNoOfOccupants() {
		return noOfOccupants;
	}
	public void setNoOfOccupants(Integer noOfOccupants) {
		this.noOfOccupants = noOfOccupants;
	}
	public CrashReportSearchList(String reportId, String reportNumber,
			String crashDate, String location, String addedDate, String addedDateTime,
			String firstName, String lastName, Integer status, String fileName,Integer noOfOccupants) {
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
	}
	public CrashReportSearchList() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

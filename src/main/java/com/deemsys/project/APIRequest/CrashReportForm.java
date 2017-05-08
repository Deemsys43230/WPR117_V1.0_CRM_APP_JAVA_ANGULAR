package com.deemsys.project.APIRequest;

import java.util.List;

public class CrashReportForm {
	
	private String localReportNumber;
	private String crashDate;
	private String county;
	private String filePath;
	private Integer reportFrom;
	private String reportPrefixCode;
	private List<PatientForm> patientForms;
	
	public String getLocalReportNumber() {
		return localReportNumber;
	}
	public void setLocalReportNumber(String localReportNumber) {
		this.localReportNumber = localReportNumber;
	}
	public String getCrashDate() {
		return crashDate;
	}
	public void setCrashDate(String crashDate) {
		this.crashDate = crashDate;
	}
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public Integer getReportFrom() {
		return reportFrom;
	}
	public void setReportFrom(Integer reportFrom) {
		this.reportFrom = reportFrom;
	}
	public String getReportPrefixCode() {
		return reportPrefixCode;
	}
	public void setReportPrefixCode(String reportPrefixCode) {
		this.reportPrefixCode = reportPrefixCode;
	}
	public List<PatientForm> getPatientForms() {
		return patientForms;
	}
	public void setPatientForms(List<PatientForm> patientForms) {
		this.patientForms = patientForms;
	}
	
	public CrashReportForm(String localReportNumber, String crashDate,
			String county, String filePath, Integer reportFrom, String reportPrefixCode,List<PatientForm> patientForms) {
		super();
		this.localReportNumber = localReportNumber;
		this.crashDate = crashDate;
		this.county = county;
		this.filePath = filePath;
		this.reportFrom = reportFrom;
		this.reportPrefixCode = reportPrefixCode;
		this.patientForms = patientForms;
	}
	public CrashReportForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

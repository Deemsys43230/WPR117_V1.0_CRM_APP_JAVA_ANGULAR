package com.deemsys.project.crashreports;

import java.util.Date;
import java.util.List;

import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.occupants.OccupantsForm;

public class CrashReportsResultByGroup {
	
	private String reportId;
	private String reportNumber;
	private String crashDate;
	private String location;
	private Integer countyId;
	private Integer crashSeverity;
	private String countyName;
	private String addedDate;
	private String addedDateTime;
	private Integer status;
	private String fileName;
	private Integer noOfOccupants;
	private List<OccupantsForm> occupantsForms;
	
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

	public String getCrashDate() {
		return crashDate;
	}

	public void setCrashDate(String crashDate) {
		this.crashDate = crashDate;
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

	public void setAddedDate(String addedDate) {
		this.addedDate = addedDate;
	}

	public String getAddedDateTime() {
		return addedDateTime;
	}

	public void setAddedDateTime(String addedDateTime) {
		this.addedDateTime = addedDateTime;
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

	public List<OccupantsForm> getOccupantsForms() {
		return occupantsForms;
	}

	public void setOccupantsForms(List<OccupantsForm> occupantsForms) {
		this.occupantsForms = occupantsForms;
	}

	public Integer getNoOfOccupants() {
		return noOfOccupants;
	}

	public void setNoOfOccupants(Integer noOfOccupants) {
		this.noOfOccupants = noOfOccupants;
	}

	public CrashReportsResultByGroup(String reportId, String reportNumber,
			String crashDate, Integer countyId, String countyName, String location, Integer crashSeverity, String addedDate, String addedDateTime,
			Integer status, String fileName, Integer noOfOccupants, List<OccupantsForm> occupantsForms) {
		super();
		this.reportId = reportId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.countyId = countyId;
		this.countyName = countyName;
		this.location = location;
		this.crashSeverity = crashSeverity;
		this.addedDate = addedDate;
		this.addedDateTime = addedDateTime;
		this.status = status;
		this.fileName = fileName;
		this.noOfOccupants = noOfOccupants;
		this.occupantsForms = occupantsForms;
	}

	public CrashReportsResultByGroup() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

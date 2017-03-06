package com.deemsys.project.crashreports;

import java.util.Date;
import java.util.List;

import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.occupants.OccupantsForm;

public class CrashReportsResultByGroup {
	
	private String reportId;
	private String reportNumber;
	private String crashDate;
	private String addedDate;
	private String addedDateTime;
	private Integer status;
	private String fileName;
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

	public String getCrashDate() {
		return crashDate;
	}

	public void setCrashDate(String crashDate) {
		this.crashDate = crashDate;
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

	public CrashReportsResultByGroup(String reportId, String reportNumber,
			String crashDate, String addedDate, String addedDateTime,
			Integer status, String fileName, List<OccupantsForm> occupantsForms) {
		super();
		this.reportId = reportId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.addedDate = addedDate;
		this.addedDateTime = addedDateTime;
		this.status = status;
		this.fileName = fileName;
		this.occupantsForms = occupantsForms;
	}

	public CrashReportsResultByGroup() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

package com.deemsys.project.crashreports;

import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.springframework.web.multipart.MultipartFile;

import com.deemsys.project.occupants.OccupantsForm;

/**
 * 
 * @author Deemsys
 *
 */
public class CrashReportsForm {

	private String reportId;
	private String reportNumber;
	private String crashDate;
	private MultipartFile crashReport;
	private String location;
	private Integer countyId;
	private Integer crashSeverity;
	private String fileName;
	private String fileAccessPath;
	private String addedDate;
	private String addedDateTime;
	private Integer status;
	private boolean isEdit;
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

	public MultipartFile getCrashReport() {
		return crashReport;
	}

	public void setCrashReport(MultipartFile crashReport) {
		this.crashReport = crashReport;
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

	public boolean getIsEdit() {
		return isEdit;
	}

	public void setIsEdit(boolean isEdit) {
		this.isEdit = isEdit;
	}

	public List<OccupantsForm> getOccupantsForms() {
		return occupantsForms;
	}

	public void setOccupantsForms(List<OccupantsForm> occupantsForms) {
		this.occupantsForms = occupantsForms;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileAccessPath() {
		return fileAccessPath;
	}

	public void setFileAccessPath(String fileAccessPath) {
		this.fileAccessPath = fileAccessPath;
	}

	public CrashReportsForm(String reportId, String reportNumber,
			String crashDate, Integer countyId, Integer crashSeverity, String location, String fileName, String fileAccessPath, String addedDate,
			String addedDateTime, Integer status,
			List<OccupantsForm> occupantsForms) {
		super();
		this.reportId = reportId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.countyId = countyId;
		this.crashSeverity = crashSeverity;
		this.location = location;
		this.fileName = fileName;
		this.fileAccessPath = fileAccessPath;
		this.addedDate = addedDate;
		this.addedDateTime = addedDateTime;
		this.status = status;
		this.occupantsForms = occupantsForms;
	}

	public CrashReportsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

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

	private String id;
	private String header;
	private boolean isExpanded;
	private String reportId;
	private String reportNumber;
	private String crashDate;
	private Integer countyId;
	private String location;
	private Integer crashSeverity;
	private String fileName;
	private String fileAccessPath;
	private String addedDate;
	private String addedDateTime;
	private Integer pageType;
	private Integer fromPage;
	private Integer toPage;
	private Integer status;
	private boolean isChecker;
	private String verifyAccountId;
	private Integer verifiedStatus;
	private List<OccupantsForm> occupantsForms;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getHeader() {
		return header;
	}
	public void setHeader(String header) {
		this.header = header;
	}
	public boolean getIsExpanded() {
		return isExpanded;
	}
	public void setIsExpanded(boolean isExpanded) {
		this.isExpanded = isExpanded;
	}
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
	public Integer getCountyId() {
		return countyId;
	}
	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
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
	public Integer getPageType() {
		return pageType;
	}
	public void setPageType(Integer pageType) {
		this.pageType = pageType;
	}
	public Integer getFromPage() {
		return fromPage;
	}
	public void setFromPage(Integer fromPage) {
		this.fromPage = fromPage;
	}
	public Integer getToPage() {
		return toPage;
	}
	public void setToPage(Integer toPage) {
		this.toPage = toPage;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public List<OccupantsForm> getOccupantsForms() {
		return occupantsForms;
	}
	public void setOccupantsForms(List<OccupantsForm> occupantsForms) {
		this.occupantsForms = occupantsForms;
	}
	public boolean getIsChecker() {
		return isChecker;
	}
	public void setIsChecker(boolean isChecker) {
		this.isChecker = isChecker;
	}
	public String getVerifyAccountId() {
		return verifyAccountId;
	}
	public void setVerifyAccountId(String verifyAccountId) {
		this.verifyAccountId = verifyAccountId;
	}
	public Integer getVerifiedStatus() {
		return verifiedStatus;
	}
	public void setVerifiedStatus(Integer verifiedStatus) {
		this.verifiedStatus = verifiedStatus;
	}
	public CrashReportsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CrashReportsForm(String id, String header, boolean isExpanded,
			String reportId, String reportNumber, String crashDate,
			Integer countyId, String location, Integer crashSeverity,
			String fileName, String fileAccessPath, String addedDate,
			String addedDateTime, Integer pageType, Integer fromPage,
			Integer toPage, Integer status, List<OccupantsForm> occupantsForms) {
		super();
		this.id = id;
		this.header = header;
		this.isExpanded = isExpanded;
		this.reportId = reportId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.countyId = countyId;
		this.location = location;
		this.crashSeverity = crashSeverity;
		this.fileName = fileName;
		this.fileAccessPath = fileAccessPath;
		this.addedDate = addedDate;
		this.addedDateTime = addedDateTime;
		this.pageType = pageType;
		this.fromPage = fromPage;
		this.toPage = toPage;
		this.status = status;
		this.occupantsForms = occupantsForms;
	}
	public CrashReportsForm(String reportId, String verifyAccountId, String reportNumber,
			String crashDate, Integer countyId, String location,
			Integer crashSeverity, String fileName, String fileAccessPath, String addedDate,
			String addedDateTime, Integer verifiedStatus, Integer status,
			List<OccupantsForm> occupantsForms) {
		super();
		this.reportId = reportId;
		this.verifyAccountId = verifyAccountId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.countyId = countyId;
		this.location = location;
		this.crashSeverity = crashSeverity;
		this.fileName = fileName;
		this.fileAccessPath = fileAccessPath;
		this.addedDate = addedDate;
		this.addedDateTime = addedDateTime;
		this.verifiedStatus = verifiedStatus;
		this.status = status;
		this.occupantsForms = occupantsForms;
	}
	
	
}

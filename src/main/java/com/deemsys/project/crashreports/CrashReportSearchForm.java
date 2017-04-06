package com.deemsys.project.crashreports;

public class CrashReportSearchForm {
	
	private String accountId;
	private String reportNumber;
	private String crashDate;
	private String location;
	private String addedOnFromDate;
	private String addedOnToDate;
	private String firstName;
	private String lastName;
	private Integer searchType;
	private Integer pageNumber;
	private Integer itemsPerPage;
	
	private Integer reportType;
	private Integer verifiedStatus;
	
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
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
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getAddedOnFromDate() {
		return addedOnFromDate;
	}
	public void setAddedOnFromDate(String addedOnFromDate) {
		this.addedOnFromDate = addedOnFromDate;
	}
	public String getAddedOnToDate() {
		return addedOnToDate;
	}
	public void setAddedOnToDate(String addedOnToDate) {
		this.addedOnToDate = addedOnToDate;
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
	public Integer getSearchType() {
		return searchType;
	}
	public void setSearchType(Integer searchType) {
		this.searchType = searchType;
	}
	public Integer getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(Integer pageNumber) {
		this.pageNumber = pageNumber;
	}
	public Integer getItemsPerPage() {
		return itemsPerPage;
	}
	public void setItemsPerPage(Integer itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
	}
	
	public Integer getReportType() {
		return reportType;
	}
	public void setReportType(Integer reportType) {
		this.reportType = reportType;
	}
	public Integer getVerifiedStatus() {
		return verifiedStatus;
	}
	public void setVerifiedStatus(Integer verifiedStatus) {
		this.verifiedStatus = verifiedStatus;
	}
	public CrashReportSearchForm(String accountId,String reportNumber, String crashDate, String location,
			String addedOnFromDate, String addedOnToDate, String firstName, String lastName, Integer searchType,Integer pageNumber,Integer itemsPerPage,
			Integer reportType,Integer verifiedStatus) {
		super();
		this.accountId = accountId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.location = location;
		this.addedOnFromDate = addedOnFromDate;
		this.addedOnToDate = addedOnToDate;
		this.firstName = firstName;
		this.lastName = lastName;
		this.searchType = searchType;
		this.pageNumber = pageNumber;
		this.itemsPerPage = itemsPerPage;
		this.reportType = reportType;
		this.verifiedStatus = verifiedStatus;
	}
	public CrashReportSearchForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

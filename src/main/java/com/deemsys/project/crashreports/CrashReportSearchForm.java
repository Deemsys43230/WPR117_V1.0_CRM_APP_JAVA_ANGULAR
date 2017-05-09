package com.deemsys.project.crashreports;

public class CrashReportSearchForm {
	
	private String accountId;
	private Integer policeDepartmentId;
	private String reportNumber;
	private String crashDate;
	private String location;
	private String firstName;
	private String lastName;
	private String addedOnFromDate;
	private String addedOnToDate;
	private Integer searchType;
	private Integer pageNumber;
	private Integer itemsPerPage;
	private Integer reportType;
	
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	public Integer getPoliceDepartmentId() {
		return policeDepartmentId;
	}
	public void setPoliceDepartmentId(Integer policeDepartmentId) {
		this.policeDepartmentId = policeDepartmentId;
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
	public CrashReportSearchForm(String accountId, Integer policeDepartmentId, String reportNumber, String crashDate, String location,
		 String firstName, String lastName, String addedOnFromDate, String addedOnToDate, Integer searchType,Integer pageNumber,Integer itemsPerPage, Integer reportType) {
		super();
		this.accountId = accountId;
		this.policeDepartmentId = policeDepartmentId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.location = location;
		this.firstName = firstName;
		this.lastName = lastName;
		this.addedOnFromDate = addedOnFromDate;
		this.addedOnToDate = addedOnToDate;
		this.searchType = searchType;
		this.pageNumber = pageNumber;
		this.itemsPerPage = itemsPerPage;
		this.reportType = reportType;
	}
	public CrashReportSearchForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

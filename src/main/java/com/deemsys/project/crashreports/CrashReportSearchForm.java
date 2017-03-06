package com.deemsys.project.crashreports;

public class CrashReportSearchForm {
	
	private String accountId;
	private String reportNumber;
	private String crashDate;
	private String addedDate;
	private String firstName;
	private String lastName;
	private Integer pageNumber;
	private Integer itemsPerPage;
	
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
	public String getAddedDate() {
		return addedDate;
	}
	public void setAddedDate(String addedDate) {
		this.addedDate = addedDate;
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
	public CrashReportSearchForm(String accountId,String reportNumber, String crashDate,
			String addedDate, String firstName, String lastName,Integer pageNumber,Integer itemsPerPage) {
		super();
		this.accountId = accountId;
		this.reportNumber = reportNumber;
		this.crashDate = crashDate;
		this.addedDate = addedDate;
		this.firstName = firstName;
		this.lastName = lastName;
		this.pageNumber = pageNumber;
		this.itemsPerPage = itemsPerPage;
	}
	public CrashReportSearchForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

package com.deemsys.project.accounts;

public class RecordsForm {
	
	private Long totalAccounts;
	private Long totalDepartments;
	private Long totalCrashReports;
	public Long getTotalAccounts() {
		return totalAccounts;
	}
	public void setTotalAccounts(Long totalAccounts) {
		this.totalAccounts = totalAccounts;
	}
	public Long getTotalDepartments() {
		return totalDepartments;
	}
	public void setTotalDepartments(Long totalDepartments) {
		this.totalDepartments = totalDepartments;
	}
	public Long getTotalCrashReports() {
		return totalCrashReports;
	}
	public void setTotalCrashReports(Long totalCrashReports) {
		this.totalCrashReports = totalCrashReports;
	}
	public RecordsForm(Long totalAccounts, Long totalDepartments, Long totalCrashReports) {
		super();
		this.totalAccounts = totalAccounts;
		this.totalDepartments = totalDepartments;
		this.totalCrashReports = totalCrashReports;
	}
	public RecordsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}

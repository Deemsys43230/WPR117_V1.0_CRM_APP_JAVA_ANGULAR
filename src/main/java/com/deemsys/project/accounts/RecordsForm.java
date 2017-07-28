package com.deemsys.project.accounts;

public class RecordsForm {
	
	private Long totalAccounts;
	private Long totalDepartments;
	private Long totalCrashReports;
	private Long totalOccupants;
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
	public Long getTotalOccupants() {
		return totalOccupants;
	}
	public void setTotalOccupants(Long totalOccupants) {
		this.totalOccupants = totalOccupants;
	}
	public RecordsForm(Long totalAccounts, Long totalDepartments, Long totalCrashReports,Long totalOCccupants) {
		super();
		this.totalAccounts = totalAccounts;
		this.totalDepartments = totalDepartments;
		this.totalCrashReports = totalCrashReports;
		this.totalOccupants = totalOCccupants;
	}
	public RecordsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}

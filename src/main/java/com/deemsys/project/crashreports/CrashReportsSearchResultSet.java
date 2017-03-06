package com.deemsys.project.crashreports;

import java.util.List;

public class CrashReportsSearchResultSet {
	private Long totalRecords;
	private List<CrashReportSearchList> crashReportSearchLists;
	
	
	public Long getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(Long totalRecords) {
		this.totalRecords = totalRecords;
	}

	public List<CrashReportSearchList> getCrashReportSearchLists() {
		return crashReportSearchLists;
	}

	public void setCrashReportSearchLists(
			List<CrashReportSearchList> crashReportSearchLists) {
		this.crashReportSearchLists = crashReportSearchLists;
	}

	public CrashReportsSearchResultSet(Long totalRecords,
			List<CrashReportSearchList> crashReportSearchLists) {
		super();
		this.totalRecords = totalRecords;
		this.crashReportSearchLists = crashReportSearchLists;
	}

	public CrashReportsSearchResultSet() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

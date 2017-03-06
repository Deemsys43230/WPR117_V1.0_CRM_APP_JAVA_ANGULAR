package com.deemsys.project.crashreports;

import java.util.List;

public class CrashReportsSearchResult {

	private Long totalRecords;
	private List<CrashReportsResultByGroup> crashReportsResult;
	
	public CrashReportsSearchResult() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getTotalRecords() {
		return totalRecords;
	}

	public void setTotalRecords(Long totalRecords) {
		this.totalRecords = totalRecords;
	}

	public List<CrashReportsResultByGroup> getCrashReportsResult() {
		return crashReportsResult;
	}

	public void setCrashReportsResult(
			List<CrashReportsResultByGroup> crashReportsResult) {
		this.crashReportsResult = crashReportsResult;
	}

	public CrashReportsSearchResult(Long totalRecords,
			List<CrashReportsResultByGroup> crashReportsResult) {
		super();
		this.totalRecords = totalRecords;
		this.crashReportsResult = crashReportsResult;
	}
	
	
	
}

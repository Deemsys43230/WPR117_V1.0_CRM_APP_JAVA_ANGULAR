package com.deemsys.project.crashreports;

import java.util.List;

public class CrashReportsFormList {
	
	private Integer pageType;
	private List<CrashReportsForm> crashReportsForms;

	public Integer getPageType() {
		return pageType;
	}

	public void setPageType(Integer pageType) {
		this.pageType = pageType;
	}

	public List<CrashReportsForm> getCrashReportsForms() {
		return crashReportsForms;
	}

	public void setCrashReportsForms(List<CrashReportsForm> crashReportsForms) {
		this.crashReportsForms = crashReportsForms;
	}

	public CrashReportsFormList(List<CrashReportsForm> crashReportsForms) {
		super();
		this.crashReportsForms = crashReportsForms;
	}

	public CrashReportsFormList() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

}

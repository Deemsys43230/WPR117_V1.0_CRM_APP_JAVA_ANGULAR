package com.deemsys.project.crashreports;

import java.util.List;

public class CrashReportsFormList {
	
	private List<CrashReportsForm> crashReportsForms;

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

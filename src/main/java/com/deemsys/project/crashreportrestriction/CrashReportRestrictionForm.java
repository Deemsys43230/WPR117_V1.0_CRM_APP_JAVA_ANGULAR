package com.deemsys.project.crashreportrestriction;



/**
 * 
 * @author Deemsys
 *
 */
public class CrashReportRestrictionForm {

	private String reportId;
	private String clientIp;
	private String lastAccessTime;
	private Integer status;
	
	public String getReportId() {
		return reportId;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	public String getClientIp() {
		return clientIp;
	}

	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}

	public String getLastAccessTime() {
		return lastAccessTime;
	}

	public void setLastAccessTime(String lastAccessTime) {
		this.lastAccessTime = lastAccessTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public CrashReportRestrictionForm(String reportId,String clientIp, String lastAccessTime,
			Integer status) {
		super();
		this.reportId = reportId;
		this.clientIp = clientIp;
		this.lastAccessTime = lastAccessTime;
		this.status = status;
	}

	public CrashReportRestrictionForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

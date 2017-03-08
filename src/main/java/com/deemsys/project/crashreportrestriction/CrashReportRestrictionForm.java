package com.deemsys.project.crashreportrestriction;



/**
 * 
 * @author Deemsys
 *
 */
public class CrashReportRestrictionForm {

	private String clientIp;
	private String lastAccessTime;
	private Integer status;
	
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

	public CrashReportRestrictionForm(String clientIp, String lastAccessTime,
			Integer status) {
		super();
		this.clientIp = clientIp;
		this.lastAccessTime = lastAccessTime;
		this.status = status;
	}

	public CrashReportRestrictionForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

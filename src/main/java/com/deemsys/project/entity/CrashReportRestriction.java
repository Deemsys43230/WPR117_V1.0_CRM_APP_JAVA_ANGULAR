package com.deemsys.project.entity;

// Generated 8 May, 2017 6:47:14 PM by Hibernate Tools 3.4.0.CR1

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * CrashReportRestriction generated by hbm2java
 */
@Entity
@Table(name = "crash_report_restriction", catalog = "CRM_boardman")
public class CrashReportRestriction implements java.io.Serializable {

	private String clientIp;
	private Date lastAccessTime;
	private Integer status;

	public CrashReportRestriction() {
	}

	public CrashReportRestriction(String clientIp) {
		this.clientIp = clientIp;
	}

	public CrashReportRestriction(String clientIp, Date lastAccessTime,
			Integer status) {
		this.clientIp = clientIp;
		this.lastAccessTime = lastAccessTime;
		this.status = status;
	}

	@Id
	@Column(name = "client_ip", unique = true, nullable = false, length = 45)
	public String getClientIp() {
		return this.clientIp;
	}

	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_access_time", length = 19)
	public Date getLastAccessTime() {
		return this.lastAccessTime;
	}

	public void setLastAccessTime(Date lastAccessTime) {
		this.lastAccessTime = lastAccessTime;
	}

	@Column(name = "status")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

}

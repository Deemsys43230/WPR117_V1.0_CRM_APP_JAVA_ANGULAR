package com.deemsys.project.verificationlog;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.CrashReports;

/**
 * 
 * @author Deemsys
 *
 */
public class VerificationLogForm {

	private Long verificationLogId;
	private String verifiedAccountId;
	private String verifiedUserFullname;
	private String reportId;
	private String verifiedNotes;
	private String verifiedDateTime;
	private Integer verifiedStatus;
	private Integer status;
	
	public Long getVerificationLogId() {
		return verificationLogId;
	}
	public void setVerificationLogId(Long verificationLogId) {
		this.verificationLogId = verificationLogId;
	}
	public String getVerifiedAccountId() {
		return verifiedAccountId;
	}
	public void setVerifiedAccountId(String verifiedAccountId) {
		this.verifiedAccountId = verifiedAccountId;
	}
	public String getVerifiedUserFullname() {
		return verifiedUserFullname;
	}
	public void setVerifiedUserFullname(String verifiedUserFullname) {
		this.verifiedUserFullname = verifiedUserFullname;
	}
	public String getReportId() {
		return reportId;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public String getVerifiedNotes() {
		return verifiedNotes;
	}
	public void setVerifiedNotes(String verifiedNotes) {
		this.verifiedNotes = verifiedNotes;
	}
	public String getVerifiedDateTime() {
		return verifiedDateTime;
	}
	public void setVerifiedDateTime(String verifiedDateTime) {
		this.verifiedDateTime = verifiedDateTime;
	}
	public Integer getVerifiedStatus() {
		return verifiedStatus;
	}
	public void setVerifiedStatus(Integer verifiedStatus) {
		this.verifiedStatus = verifiedStatus;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public VerificationLogForm(Long verificationLogId,
			String verifiedAccountId, String verifiedUserFullname, String reportId, String verifiedNotes,
			String verifiedDateTime, Integer verifiedStatus, Integer status) {
		super();
		this.verificationLogId = verificationLogId;
		this.verifiedAccountId = verifiedAccountId;
		this.verifiedUserFullname = verifiedUserFullname;
		this.reportId = reportId;
		this.verifiedNotes = verifiedNotes;
		this.verifiedDateTime = verifiedDateTime;
		this.verifiedStatus = verifiedStatus;
		this.status = status;
	}
	public VerificationLogForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

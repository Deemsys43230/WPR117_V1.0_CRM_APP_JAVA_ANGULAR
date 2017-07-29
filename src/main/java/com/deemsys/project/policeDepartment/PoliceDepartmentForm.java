package com.deemsys.project.policeDepartment;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Deemsys
 *
 */
public class PoliceDepartmentForm {

	private Integer policeDepartmentId;
	private Integer countyId;
	private String countyName;
	private String name;
	private String code;
	private String loginLink;
	private String searchLink;
	private String createdDateTime;
	private Integer status;
	private Integer isEnabled;
	private String  url;
	
	// View Links
	private String viewLoginLink;
	private String viewSearchLink;
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getPoliceDepartmentId() {
		return policeDepartmentId;
	}

	public void setPoliceDepartmentId(Integer policeDepartmentId) {
		this.policeDepartmentId = policeDepartmentId;
	}

	public Integer getCountyId() {
		return countyId;
	}

	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

	public String getCountyName() {
		return countyName;
	}

	public void setCountyName(String countyName) {
		this.countyName = countyName;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLoginLink() {
		return loginLink;
	}

	public void setLoginLink(String loginLink) {
		this.loginLink = loginLink;
	}

	public String getSearchLink() {
		return searchLink;
	}

	public void setSearchLink(String searchLink) {
		this.searchLink = searchLink;
	}

	public String getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(String createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Integer isEnabled) {
		this.isEnabled = isEnabled;
	}

	public String getViewLoginLink() {
		return viewLoginLink;
	}

	public void setViewLoginLink(String viewLoginLink) {
		this.viewLoginLink = viewLoginLink;
	}

	public String getViewSearchLink() {
		return viewSearchLink;
	}

	public void setViewSearchLink(String viewSearchLink) {
		this.viewSearchLink = viewSearchLink;
	}

	public PoliceDepartmentForm(Integer policeDepartmentId, Integer countyId,String countyName, String name,
			String code, String loginLink, String searchLink, String createdDateTime, Integer status,Integer isEnabled,String url, String viewLoginLink, String viewSearchLink) {
		super();
		this.policeDepartmentId = policeDepartmentId;
		this.countyId = countyId;
		this.name = name;
		this.code = code;
		this.loginLink = loginLink;
		this.searchLink = searchLink;
		this.createdDateTime = createdDateTime;
		this.status = status;
		this.isEnabled=isEnabled;
		this.countyName=countyName;
		this.url=url;
		this.viewLoginLink=viewLoginLink;
		this.viewSearchLink=viewSearchLink;
	}

	public PoliceDepartmentForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

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
	private String name;
	private String code;
	private String createdDateTime;
	private Integer status;
	
	public Integer getPoliceDepartmentId() {
		return policeDepartmentId;
	}

	public void setPoliceDepartmentId(Integer policeDepartmentId) {
		this.policeDepartmentId = policeDepartmentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
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

	public PoliceDepartmentForm(Integer policeDepartmentId, String name,
			String code, String createdDateTime, Integer status) {
		super();
		this.policeDepartmentId = policeDepartmentId;
		this.name = name;
		this.code = code;
		this.createdDateTime = createdDateTime;
		this.status = status;
	}

	public PoliceDepartmentForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

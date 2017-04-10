package com.deemsys.project.county;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Deemsys
 *
 */
public class CountyForm {

	private Integer countyId;
	private String name;
	private Integer status;
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
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public CountyForm(Integer countyId, String name, Integer status) {
		super();
		this.countyId = countyId;
		this.name = name;
		this.status = status;
	}
	public CountyForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

package com.deemsys.project.occupants;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Deemsys
 *
 */
public class OccupantsForm {

	private String firstName;
	private String lastName;
	private Integer status;
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public OccupantsForm(String firstName, String lastName, Integer status) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.status = status;
	}

	public OccupantsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

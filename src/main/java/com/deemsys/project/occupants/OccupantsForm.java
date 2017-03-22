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
	private Integer crashSeverity;
	private String address;
	private String phoneNumber;
	private String atFaultInsuranceCompany;
	private String victimInsuranceCompany;
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

	public Integer getCrashSeverity() {
		return crashSeverity;
	}

	public void setCrashSeverity(Integer crashSeverity) {
		this.crashSeverity = crashSeverity;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAtFaultInsuranceCompany() {
		return atFaultInsuranceCompany;
	}

	public void setAtFaultInsuranceCompany(String atFaultInsuranceCompany) {
		this.atFaultInsuranceCompany = atFaultInsuranceCompany;
	}

	public String getVictimInsuranceCompany() {
		return victimInsuranceCompany;
	}

	public void setVictimInsuranceCompany(String victimInsuranceCompany) {
		this.victimInsuranceCompany = victimInsuranceCompany;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public OccupantsForm(String firstName, String lastName,
			Integer crashSeverity, String address, String phoneNumber,
			String atFaultInsuranceCompany, String victimInsuranceCompany,
			Integer status) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.crashSeverity = crashSeverity;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.atFaultInsuranceCompany = atFaultInsuranceCompany;
		this.victimInsuranceCompany = victimInsuranceCompany;
		this.status = status;
	}

	public OccupantsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

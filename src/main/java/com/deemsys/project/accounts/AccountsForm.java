package com.deemsys.project.accounts;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Deemsys
 *
 */
public class AccountsForm {

	private String accountId;
	private String username;
	private Integer roleId;
	private String firstName;
	private String lastName;
	private String middleName;
	private String emailId;
	private String phoneNumber;
	private String addedDateTime;
	private Integer status;
	
	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

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

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddedDateTime() {
		return addedDateTime;
	}

	public void setAddedDateTime(String addedDateTime) {
		this.addedDateTime = addedDateTime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public AccountsForm(String accountId, String username, Integer roleId, String firstName, String lastName,
			String middleName, String emailId, String phoneNumber, String addedDateTime, Integer status) {
		super();
		this.accountId = accountId;
		this.username = username;
		this.roleId = roleId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.middleName = middleName;
		this.emailId = emailId;
		this.phoneNumber = phoneNumber;
		this.addedDateTime = addedDateTime;
		this.status = status;
	}

	public AccountsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

package com.deemsys.project.users;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.Roles;

/**
 * 
 * @author Deemsys
 *
 */
public class UsersForm {

	private Integer userId;
	private Integer roleId;
	private String accountId;
	private String username;
	private String password;
	private Integer isEnable;
	private Integer status;
	
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(Integer isEnable) {
		this.isEnable = isEnable;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public UsersForm(Integer userId, Integer roleId, String accountId,
			String username, String password, Integer isEnable, Integer status) {
		super();
		this.userId = userId;
		this.roleId = roleId;
		this.accountId = accountId;
		this.username = username;
		this.password = password;
		this.isEnable = isEnable;
		this.status = status;
	}

	public UsersForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

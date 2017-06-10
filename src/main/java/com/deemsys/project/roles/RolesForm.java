package com.deemsys.project.roles;

public class RolesForm {
	
	private Integer roleId;
	private String role;
	private String name;
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public RolesForm(Integer roleId, String role, String name) {
		super();
		this.roleId = roleId;
		this.role = role;
		this.name = name;
	}
	public RolesForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}

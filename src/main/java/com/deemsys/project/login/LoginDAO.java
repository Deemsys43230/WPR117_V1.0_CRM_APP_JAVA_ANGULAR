package com.deemsys.project.login;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.Users;
/**
 * 
 * @author Deemsys
 *
 */
public interface LoginDAO extends IGenericDAO<Users>{
	public Users getByUsername(String username);

	public Users getByUsernameAndDepartment(String username, Integer departmentId);
}

package com.deemsys.project.users;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.Users;
/**
 * 
 * @author Deemsys
 *
 */
public interface UsersDAO extends IGenericDAO<Users>{
	public Users getByUsername(String username);
	public Users getByAccountId(String accountId);
}

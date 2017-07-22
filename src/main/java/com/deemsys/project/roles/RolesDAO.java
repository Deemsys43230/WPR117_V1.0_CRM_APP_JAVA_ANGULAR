package com.deemsys.project.roles;

import java.util.List;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.Roles;
/**
 * 
 * @author Deemsys
 *
 */
public interface RolesDAO extends IGenericDAO<Roles>{

	List<Roles> getRoleForAccount();
}

package com.deemsys.project.policeDepartment;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.PoliceDepartment;
/**
 * 
 * @author Deemsys
 *
 */
public interface PoliceDepartmentDAO extends IGenericDAO<PoliceDepartment>{
public PoliceDepartment getPoliceDepartmentByLink(String departmentLink);
public PoliceDepartment getPoliceDepartmentById(Integer policeDepartmentId);
public long totalNumberOfDepartment();
public Integer checkDepartmentName(String name,Integer policeDepartmentId);
public Integer checkDepartmentLogin(String login,Integer policeDepartmentId);
public Integer checkDepartmentCode(String code,Integer policeDepartmentId);
public Integer checkDepartmentSearch(String search,Integer policeDepartmentId);

}

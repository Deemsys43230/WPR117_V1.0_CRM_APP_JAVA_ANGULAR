package com.deemsys.project.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.Users;
import com.deemsys.project.users.UsersDAO;

@Service
@Transactional
public class LoginService {

	@Autowired
	UsersDAO usersDAO;
	
	public String getCurrentRole() throws Exception{
		String currentRole="";
		try{
			User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			Object[] role = user.getAuthorities().toArray();
			if(role[0].toString().equals(CRMConstants.CRM_ADMIN_ROLE)){
				currentRole=CRMConstants.CRM_ADMIN_ROLE;
			}else if(role[0].toString().equals(CRMConstants.CRM_USER_ROLE)){
				currentRole=CRMConstants.CRM_USER_ROLE;
			}
		}catch(Exception ex){
			ex.printStackTrace();
			System.out.println(ex.toString());
		}
		return currentRole;
	}
	
	public Integer getCurrentUserId(){
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return usersDAO.getByUsername(this.splitUserName(user.getUsername())).getUserId();
	}
	
	public String getCurrentAccountId(){
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return usersDAO.getByUsername(this.splitUserName(user.getUsername())).getAccounts().getAccountId();
	}
	
	public Integer getCurrentAccountPoliceDepartmentId(){
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Accounts accounts=usersDAO.getByUsername(this.splitUserName(user.getUsername())).getAccounts();
		
		return accounts.getPoliceDepartment().getPoliceDepartmentId();
	}
	
	public Integer checkUsernameExist(String username){
		Users users = usersDAO.getByUsername(username);
		if(username!=null){
			return 0;
		}else{
			return 1;
		}
	}
	
	public String splitUserName(String combinedUserName){
		String splittedUserName[]=combinedUserName.split(CRMConstants.USERNAME_DELIMETER);
		
		return splittedUserName[0];
	};
}

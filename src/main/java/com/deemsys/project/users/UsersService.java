package com.deemsys.project.users;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.accounts.AccountsDAO;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.Roles;
import com.deemsys.project.entity.Users;
import com.deemsys.project.login.PasswordEncryptor;
import com.deemsys.project.roles.RolesDAO;
/**
 * 
 * @author Deemsys
 *
 * Users 	 - Entity
 * users 	 - Entity Object
 * userss 	 - Entity List
 * usersDAO   - Entity DAO
 * usersForms - EntityForm List
 * UsersForm  - EntityForm
 *
 */
@Service
@Transactional
public class UsersService {

	@Autowired
	UsersDAO usersDAO;
	
	@Autowired
	RolesDAO rolesDAO;
	
	@Autowired
	AccountsDAO accountsDAO;
	
	@Autowired
	PasswordEncryptor passwordEncryptor;
	
	//Get All Entries
	public List<UsersForm> getUsersList()
	{
		List<UsersForm> usersForms=new ArrayList<UsersForm>();
		
		List<Users> userss=new ArrayList<Users>();
		
		userss=usersDAO.getAll();
		
		for (Users users : userss) {
			//TODO: Fill the List
			UsersForm usersForm=new UsersForm(users.getUserId(), users.getRoles().getRoleId(), users.getAccounts().getAccountId(), users.getUsername(), users.getPassword(), users.getIsEnable(), users.getStatus());
			usersForms.add(usersForm);
		}
		
		return usersForms;
	}
	
	//Get Particular Entry
	public UsersForm getUsers(Integer userId)
	{
		Users users=new Users();
		
		users=usersDAO.get(userId);
		
		//TODO: Convert Entity to Form
		//Start
		
		UsersForm usersForm=new UsersForm(users.getUserId(), users.getRoles().getRoleId(), users.getAccounts().getAccountId(), users.getUsername(), users.getPassword(), users.getIsEnable(), users.getStatus());
		
		//End
		
		return usersForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeUsers(UsersForm usersForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		Users users=new Users();
		
		//Logic Ends
		
		
		usersDAO.merge(users);
		return 1;
	}
	
	//Save an Entry
	public int saveUsers(UsersForm usersForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		Roles roles = rolesDAO.get(usersForm.getRoleId());
		Accounts accounts = accountsDAO.getAccountsById(usersForm.getAccountId());
		
		Users users=new Users(accounts, roles, usersForm.getUsername(), passwordEncryptor.encodePassword(usersForm.getUsername()), usersForm.getIsEnable(), usersForm.getStatus());
		
		//Logic Ends
		
		usersDAO.save(users);
		return 1;
	}
	
	//Update an Entry
	public int updateUsers(UsersForm usersForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		Roles roles = rolesDAO.get(usersForm.getRoleId());
		Accounts accounts = accountsDAO.getAccountsById(usersForm.getAccountId());
		
		Users user=new Users();
		user=usersDAO.getByAccountId(usersForm.getAccountId());
		Users users=new Users(usersForm.getUserId(),accounts, roles, usersForm.getUsername(),user.getPassword(), usersForm.getIsEnable(), usersForm.getStatus());
		
		//Logic Ends
		
		usersDAO.update(users);
		return 1;
	}
	
	//Delete an Entry
	public int deleteUsers(Integer id)
	{
		usersDAO.delete(id);
		return 1;
	}
	
	//check username exists
	public int checkUserNameExists(String username,String accountId)
	{
		return usersDAO.checkUserNameExists(username, accountId);
	}
	
	
}

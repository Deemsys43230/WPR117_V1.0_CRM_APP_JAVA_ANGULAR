package com.deemsys.project.accounts;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.test.OAuth2ContextConfiguration.Password;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.crashreports.CrashReportsDAO;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.CrashReports;
import com.deemsys.project.entity.PoliceDepartment;
import com.deemsys.project.entity.Roles;
import com.deemsys.project.entity.Users;
import com.deemsys.project.login.PasswordEncryptor;
import com.deemsys.project.users.UsersDAO;
import com.deemsys.project.users.UsersForm;
import com.deemsys.project.users.UsersService;
import com.deemsys.project.policeDepartment.PoliceDepartmentDAO;
import com.deemsys.project.roles.RolesDAO;
import com.deemsys.project.roles.RolesForm;
import java.util.UUID;

/**
 * 
 * @author Deemsys
 *
 * Accounts 	 - Entity
 * accounts 	 - Entity Object
 * accountss 	 - Entity List
 * accountsDAO   - Entity DAO
 * accountsForms - EntityForm List
 * AccountsForm  - EntityForm
 *
 */
@Service
@Transactional
public class AccountsService {

	@Autowired
	AccountsDAO accountsDAO;
	
	@Autowired
	UsersDAO usersDAO;
	
	@Autowired
	UsersService usersService;
	
	@Autowired
	PasswordEncryptor passwordEncryptor;
	
	@Autowired
	PoliceDepartmentDAO policeDepartmentDAO;
	
	@Autowired
	RolesDAO rolesDAO;
	
	@Autowired
	CrashReportsDAO crashReportsDAO;
	
	//Get All Entries
	public List<AccountsForm> getAccountsList()
	{
		List<AccountsForm> accountsForms=new ArrayList<AccountsForm>();
		
		List<Accounts> accountss=new ArrayList<Accounts>();
		
		accountss=accountsDAO.getAll();
		
		for (Accounts accounts : accountss) {
			//TODO: Fill the List
			Users users = usersDAO.getByAccountId(accounts.getAccountId());
			AccountsForm accountsForm=new AccountsForm(accounts.getAccountId(), accounts.getPoliceDepartment().getPoliceDepartmentId(), users.getUsername(), users.getRoles().getRoleId(), accounts.getFirstName(), accounts.getLastName(), accounts.getMiddleName(), accounts.getEmailId(), accounts.getPhoneNumber(), CRMConstants.convertUSAFormatWithTime(accounts.getAddedDateTime()), accounts.getStatus(),users.getIsEnable());
			accountsForms.add(accountsForm);
		}
		
		return accountsForms;
	}
	
	//Get Particular Entry
	public AccountsForm getAccounts(String accountId)
	{      
		   
		Accounts accounts=accountsDAO.getAccountsById(accountId);
		   
		//TODO: Convert Entity to Form
		//Start
		Users users = usersDAO.getByAccountId(accountId);
		   AccountsForm accountsForm=new AccountsForm(accounts.getAccountId(), accounts.getPoliceDepartment().getPoliceDepartmentId(), users.getUsername(), users.getRoles().getRoleId(), accounts.getFirstName(), accounts.getLastName(), accounts.getMiddleName(), accounts.getEmailId(), accounts.getPhoneNumber(), CRMConstants.convertUSAFormatWithTime(accounts.getAddedDateTime()), accounts.getStatus(),users.getIsEnable());
		
		//End
		
		return accountsForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeAccounts(AccountsForm accountsForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		Accounts accounts=new Accounts();
		
		//Logic Ends
		
		
		accountsDAO.merge(accounts);
		return 1;
	}
	
	//Save an Entry
	public int saveAccounts(AccountsForm accountsForm)
	{
		

		try {
			PoliceDepartment policeDepartment = policeDepartmentDAO.get(accountsForm.getPoliceDepartmentId());
			
			String accountId=UUID.randomUUID().toString();
			Accounts accounts=new Accounts(accountId, policeDepartment, accountsForm.getFirstName(), accountsForm.getLastName(), accountsForm.getMiddleName(), accountsForm.getEmailId(), accountsForm.getPhoneNumber(), new Date(), accountsForm.getStatus(),0, null, null);
			accountsDAO.saveAccount(accounts);
			
			UsersForm usersForm = new UsersForm(null, CRMConstants.CRM_USER_ROLE_ID, accounts.getAccountId(), accountsForm.getUsername(), accountsForm.getUsername(), 1, 1);
			usersService.saveUsers(usersForm);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		//Logic Ends
		
		return 1;
	}
	
	//Update an Entry
	public int updateAccounts(AccountsForm accountsForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		PoliceDepartment policeDepartment = policeDepartmentDAO.get(accountsForm.getPoliceDepartmentId());
		Accounts accounts=new Accounts(accountsForm.getAccountId(), policeDepartment, accountsForm.getFirstName(), accountsForm.getLastName(), accountsForm.getMiddleName(), accountsForm.getEmailId(), accountsForm.getPhoneNumber(), CRMConstants.convertYearFormatWithTime24Hr(accountsForm.getAddedDateTime()), accountsForm.getStatus(),0, null, null);

		accountsDAO.update(accounts);
		Users users=usersDAO.getByAccountId(accountsForm.getAccountId());
	    Roles roles=rolesDAO.get(accountsForm.getRoleId());
		users.setRoles(roles);
		users.setUsername(accountsForm.getUsername());
		usersDAO.update(users);
		//UsersForm usersForm = new UsersForm(users.getUserId(), CRMConstants.CRM_USER_ROLE_ID, accounts.getAccountId(), accountsForm.getUsername(), accountsForm.getUsername(), 1, 1);
		//usersService.updateUsers(usersForm);
		
		//Logic Ends
		return 1;
	}
	
	//Delete an Entry
	public int deleteAccounts(String accountId)
	{
		
		Accounts accounts=accountsDAO.getAccountsById(accountId);
		Users users=usersDAO.getByAccountId(accountId);

		//updating table instead deletion
		accounts.setIsdeleted(1);
		accountsDAO.update(accounts);
		users.setIsEnable(0);
		usersDAO.update(users);
	/*	accountsDAO.delete(accountId);
		Users user=usersDAO.getByAccountId(accountId);
		usersDAO.delete(user.getUserId());*/
		return 1;
	}
	
	// Enable or Disable 
	public int enableOrDisableAccount(String accountId){
		
		Accounts accounts = accountsDAO.getAccountsById(accountId);
		Users users = usersDAO.getByAccountId(accountId);
		if(users.getIsEnable()==1){
			accounts.setStatus(0);
			users.setIsEnable(0);
		}else{
			accounts.setStatus(1);
			users.setIsEnable(1);
		}
		accountsDAO.update(accounts);
		
		usersDAO.update(users);
		
		return 1;
	}
	
	// Reset Password
	public int resetPassword(String accountId)
	{
		Users users = usersDAO.getByAccountId(accountId);
		users.setPassword(passwordEncryptor.encodePassword(users.getUsername()));
		usersDAO.update(users);
		return 1;
	}

	public int changePassword(String accountId,String password) {
		// TODO Auto-generated method stub
		Users users = usersDAO.getByAccountId(accountId);
		users.setPassword(passwordEncryptor.encodePassword(password));
		usersDAO.update(users);
		return 1;
	}

	public Integer checkPassword(String accountId, String currentPassword) {
		// TODO Auto-generated method stub
		return usersDAO.checkPassword(accountId,passwordEncryptor.encodePassword(currentPassword));
	}
	
	//get RolesList
	public List<RolesForm> getRolesList()
	{
		List<Roles> roless=new ArrayList<Roles>();
		roless=rolesDAO.getAll();
		List<RolesForm> rolesForm=new ArrayList<RolesForm>();
		for(Roles roles:roless)
		{
		RolesForm	rolesForm1=new RolesForm(roles.getRoleId(),roles.getRole(),roles.getName());
		rolesForm.add(rolesForm1);
		}
		return rolesForm;
	}
	
	
	//getting total Records
	public RecordsForm getTotalRecords()
	{
		Long totalAccounts=accountsDAO.totalNumberOfAccounts();
		Long totalReports=crashReportsDAO.totalNumberOfCrash();
		Long totalDepartment=policeDepartmentDAO.totalNumberOfDepartment();
		
		RecordsForm recordsForm=new RecordsForm(totalAccounts, totalDepartment, totalReports);
		return recordsForm;
	}
}

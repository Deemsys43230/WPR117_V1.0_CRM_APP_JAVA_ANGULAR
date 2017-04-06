package com.deemsys.project.accounts;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.test.OAuth2ContextConfiguration.Password;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.Users;
import com.deemsys.project.login.PasswordEncryptor;
import com.deemsys.project.users.UsersDAO;
import com.deemsys.project.users.UsersForm;
import com.deemsys.project.users.UsersService;
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
	
	//Get All Entries
	public List<AccountsForm> getAccountsList()
	{
		List<AccountsForm> accountsForms=new ArrayList<AccountsForm>();
		
		List<Accounts> accountss=new ArrayList<Accounts>();
		
		accountss=accountsDAO.getAll();
		
		for (Accounts accounts : accountss) {
			//TODO: Fill the List
			Users users = usersDAO.getByAccountId(accounts.getAccountId());
			AccountsForm accountsForm=new AccountsForm(accounts.getAccountId(), users.getUsername(), users.getRoles().getRoleId(), accounts.getFirstName(), accounts.getLastName(), accounts.getMiddleName(), accounts.getEmailId(), accounts.getPhoneNumber(), CRMConstants.convertUSAFormatWithTime(accounts.getAddedDateTime()), accounts.getStatus());
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
		AccountsForm accountsForm=new AccountsForm(accounts.getAccountId(), users.getUsername(), users.getRoles().getRoleId(), accounts.getFirstName(), accounts.getLastName(), accounts.getMiddleName(), accounts.getEmailId(), accounts.getPhoneNumber(), CRMConstants.convertUSAFormatWithTime(accounts.getAddedDateTime()), accounts.getStatus());
		
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
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts

		try {
			Accounts accounts=new Accounts(accountsForm.getAccountId(), accountsForm.getFirstName(), accountsForm.getLastName(), accountsForm.getMiddleName(), accountsForm.getEmailId(), accountsForm.getPhoneNumber(), new Date(), accountsForm.getStatus(), null, null, null, null,null,null);
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
		
		Accounts accounts=new Accounts(accountsForm.getAccountId(), accountsForm.getFirstName(), accountsForm.getLastName(), accountsForm.getMiddleName(), accountsForm.getEmailId(), accountsForm.getPhoneNumber(), CRMConstants.convertYearFormatWithTime(accountsForm.getAddedDateTime()), accountsForm.getStatus(), null, null, null, null,null,null);

		accountsDAO.update(accounts);
		
		//Logic Ends
		return 1;
	}
	
	//Delete an Entry
	public int deleteAccounts(String accountId)
	{
		accountsDAO.deleteAccounts(accountId);
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
		users.setPassword(passwordEncryptor.encodePassword(users.getPassword()));
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
		
}

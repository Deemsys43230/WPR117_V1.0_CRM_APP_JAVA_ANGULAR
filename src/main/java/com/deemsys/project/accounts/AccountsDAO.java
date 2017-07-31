package com.deemsys.project.accounts;

import java.util.List;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.Accounts;
/**
 * 
 * @author Deemsys
 *
 */
public interface AccountsDAO extends IGenericDAO<Accounts>{
	
	public void saveAccount(Accounts accounts) throws Exception;
	public Accounts getAccountsById(String accountId);
	public void deleteAccounts(String accountId);
	public Long totalNumberOfAccounts();
	public List<Accounts> getAccountsByDepartmentId(Integer policeDepartmentId);
}

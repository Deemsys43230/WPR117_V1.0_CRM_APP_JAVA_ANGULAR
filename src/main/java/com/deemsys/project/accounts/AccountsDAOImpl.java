package com.deemsys.project.accounts;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.entity.Accounts;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class AccountsDAOImpl implements AccountsDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(Accounts entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(Accounts entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public Accounts get(Integer id) {
		// TODO Auto-generated method stub
		return (Accounts) this.sessionFactory.getCurrentSession().get(Accounts.class, id);
	}

	@Override
	public Accounts update(Accounts entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().update(entity);
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().delete(this.get(id));
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Accounts> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(Accounts.class).add(Restrictions.ne("isdeleted", 1)).list();
	}

	@Override
	public List<Accounts> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Accounts> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Accounts> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Accounts> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Accounts> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Accounts> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Accounts> find(String ParamName, Date date) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean disable(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean enable(Integer id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean checkName(String name) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean checkName(Integer id, String name) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<Accounts> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Accounts getAccountsById(String accountId) {
		// TODO Auto-generated method stub
		return (Accounts) this.sessionFactory.getCurrentSession().createCriteria(Accounts.class).add(Restrictions.eq("accountId", accountId)).uniqueResult();
	}

	@Override
	public void saveAccount(Accounts accounts) throws Exception {
		// TODO Auto-generated method stub
		try{
			String uuid=UUID.randomUUID().toString();
			accounts.setAccountId(uuid.replaceAll("-", ""));
			this.sessionFactory.getCurrentSession().save(accounts);
		}catch(Exception ex){
			throw ex;
		}
	}

	@Override
	public void deleteAccounts(String accountId) {
		// TODO Auto-generated method stub
		Accounts accounts=this.getAccountsById(accountId);
		if(accounts!=null){
			this.sessionFactory.getCurrentSession().delete(accounts);
		}
		
	}

	@Override
	public Long totalNumberOfAccounts() {
		
		Long total= (Long)this.sessionFactory.getCurrentSession().createCriteria(Accounts.class).setProjection(Projections.count("accountId")).uniqueResult();
	return total;
	}

}

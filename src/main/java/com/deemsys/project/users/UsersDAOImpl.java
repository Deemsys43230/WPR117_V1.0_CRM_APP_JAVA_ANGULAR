package com.deemsys.project.users;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.entity.Users;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class UsersDAOImpl implements UsersDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(Users entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(Users entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public Users get(Integer id) {
		// TODO Auto-generated method stub
		return (Users) this.sessionFactory.getCurrentSession().get(Users.class, id);
	}

	@Override
	public Users update(Users entity) {
	
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
	public List<Users> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(Users.class).list();
	}

	@Override
	public List<Users> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Users> find(String ParamName, Date date) {
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
	public List<Users> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Users getByUsername(String username) {
		// TODO Auto-generated method stub
		return (Users) this.sessionFactory.getCurrentSession().createCriteria(Users.class).add(Restrictions.eq("username", username)).uniqueResult();
	}

	@Override
	public Users getByAccountId(String accountId) {
		// TODO Auto-generated method stub
		return (Users) this.sessionFactory.getCurrentSession().createCriteria(Users.class).add(Restrictions.eq("accounts.accountId", accountId)).uniqueResult();
	}

	@Override
	public Integer checkPassword(String accountId, String password) {
		// TODO Auto-generated method stub
		Users users = (Users) this.sessionFactory.getCurrentSession().createCriteria(Users.class).add(Restrictions.and(Restrictions.eq("accounts.accountId", accountId), Restrictions.eq("password", password))).uniqueResult();
		if(users!=null){
			return 1;
		}else{
			return 0;
		}
	}

	//check username exists
	@Override
	public Integer checkUserNameExists(String username, String accountId) {
		
Criteria criteria=this.sessionFactory.getCurrentSession().createCriteria(Users.class);
		
		//Check User name
		criteria.add(Restrictions.eq("username", username));
		
		//Skip for Add Edit
		if(accountId!=null)
			criteria.add(Restrictions.ne("accounts.accountId",accountId));
		
		Users users=(Users) criteria.uniqueResult();
		
		if(users!=null){
			return 1;
		}else{
			return 0;
		}
	}


	

}

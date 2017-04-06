package com.deemsys.project.checkeruploadermapping;

import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.entity.CheckerUploaderMapping;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class CheckerUploaderMappingDAOImpl implements CheckerUploaderMappingDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(CheckerUploaderMapping entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(CheckerUploaderMapping entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public CheckerUploaderMapping get(Integer id) {
		// TODO Auto-generated method stub
		return (CheckerUploaderMapping) this.sessionFactory.getCurrentSession().get(CheckerUploaderMapping.class, id);
	}

	@Override
	public CheckerUploaderMapping update(CheckerUploaderMapping entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
		return null;
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().delete(this.get(id));
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CheckerUploaderMapping> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(CheckerUploaderMapping.class).list();
	}

	@Override
	public List<CheckerUploaderMapping> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CheckerUploaderMapping> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CheckerUploaderMapping> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CheckerUploaderMapping> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CheckerUploaderMapping> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CheckerUploaderMapping> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CheckerUploaderMapping> find(String ParamName, Date date) {
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
	public List<CheckerUploaderMapping> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CheckerUploaderMapping getCheckerUploaderMappingByUploader(
			String accountId) {
		// TODO Auto-generated method stub
		return (CheckerUploaderMapping) this.sessionFactory.getCurrentSession().createCriteria(CheckerUploaderMapping.class).add(Restrictions.eq("accountsByUploaderAccountId.accountId", accountId)).uniqueResult();
	}

	

}

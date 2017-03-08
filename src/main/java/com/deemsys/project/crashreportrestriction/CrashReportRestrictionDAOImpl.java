package com.deemsys.project.crashreportrestriction;

import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.entity.CrashReportRestriction;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class CrashReportRestrictionDAOImpl implements CrashReportRestrictionDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(CrashReportRestriction entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(CrashReportRestriction entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public CrashReportRestriction get(Integer id) {
		// TODO Auto-generated method stub
		return (CrashReportRestriction) this.sessionFactory.getCurrentSession().get(CrashReportRestriction.class, id);
	}

	@Override
	public CrashReportRestriction update(CrashReportRestriction entity) {
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
	public List<CrashReportRestriction> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(CrashReportRestriction.class).list();
	}

	@Override
	public List<CrashReportRestriction> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReportRestriction> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReportRestriction> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReportRestriction> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReportRestriction> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReportRestriction> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReportRestriction> find(String ParamName, Date date) {
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
	public List<CrashReportRestriction> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CrashReportRestriction getCrashReportRestrictionByClintIP(
			String clientIP) {
		// TODO Auto-generated method stub
		return (CrashReportRestriction) this.sessionFactory.getCurrentSession().createCriteria(CrashReportRestriction.class).add(Restrictions.eq("clientIp", clientIP)).uniqueResult();
	}

	

}

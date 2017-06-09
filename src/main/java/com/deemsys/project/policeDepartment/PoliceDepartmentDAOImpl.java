package com.deemsys.project.policeDepartment;

import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.entity.CrashReports;
import com.deemsys.project.entity.PoliceDepartment;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class PoliceDepartmentDAOImpl implements PoliceDepartmentDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(PoliceDepartment entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(PoliceDepartment entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public PoliceDepartment get(Integer id) {
		// TODO Auto-generated method stub
		return (PoliceDepartment) this.sessionFactory.getCurrentSession().get(PoliceDepartment.class, id);
	}

	@Override
	public PoliceDepartment update(PoliceDepartment entity) {
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
	public List<PoliceDepartment> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(PoliceDepartment.class).add(Restrictions.ne("policeDepartmentId", 1)).list();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PoliceDepartment> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(PoliceDepartment.class).add(Restrictions.eq(paramName, paramValue)).list();
	}

	@Override
	public List<PoliceDepartment> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PoliceDepartment> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PoliceDepartment> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PoliceDepartment> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PoliceDepartment> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<PoliceDepartment> find(String ParamName, Date date) {
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
	public List<PoliceDepartment> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PoliceDepartment getPoliceDepartmentById(Integer policeDepartmentId)
	{
		return (PoliceDepartment) this.sessionFactory.getCurrentSession().createCriteria(PoliceDepartment.class).add(Restrictions.eq("policeDepartmentId", policeDepartmentId)).uniqueResult();
		
		
	}

	@Override
	public long totalNumberOfDepartment() {
		Long total= (Long)this.sessionFactory.getCurrentSession().createCriteria(PoliceDepartment.class).setProjection(Projections.count("policeDepartmentId")).add(Restrictions.ne("policeDepartmentId",1)).uniqueResult();
		return total;
		
		
	}

	@Override
	public PoliceDepartment getPoliceDepartmentByLink(String departmentLink) {
		// TODO Auto-generated method stub
		return (PoliceDepartment) this.sessionFactory.getCurrentSession().createCriteria(PoliceDepartment.class).add(Restrictions.eq("link", departmentLink)).uniqueResult();
	}

	

}

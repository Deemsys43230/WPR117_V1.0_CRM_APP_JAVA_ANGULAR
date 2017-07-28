package com.deemsys.project.settings;

import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.entity.Settings;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class SettingsDAOImpl implements SettingsDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(Settings entity) 
	{
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(Settings entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public Settings get(Integer id) {
		// TODO Auto-generated method stub
		return (Settings) this.sessionFactory.getCurrentSession().get(Settings.class, id);
	}

	@Override
	public Settings update(Settings entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
		return null;
	}

	@Override
	public void delete(Integer settingId) 
	{
		Settings settings=this.getSettingsById(settingId);
		
		if(settings!=null)
		{
		this.sessionFactory.getCurrentSession().delete(settings);
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Settings> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(Settings.class).list();
	}

	@Override
	public List<Settings> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Settings> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Settings> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Settings> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Settings> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Settings> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Settings> find(String ParamName, Date date) {
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
	public List<Settings> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Settings getSettingsById(Integer settingId)
	{
		
		return (Settings) this.sessionFactory.getCurrentSession().createCriteria(Settings.class).add(Restrictions.eq("settingId", settingId)).uniqueResult();
	}

	

}

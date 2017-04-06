package com.deemsys.project.occupants;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.entity.Occupants;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class OccupantsDAOImpl implements OccupantsDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(Occupants entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(Occupants entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().merge(entity);
	}	
	
	@Override
	public Occupants get(Integer id) {
		// TODO Auto-generated method stub
		return (Occupants) this.sessionFactory.getCurrentSession().get(Occupants.class, id);
	}

	@Override
	public Occupants update(Occupants entity) {
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
	public List<Occupants> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(Occupants.class).list();
	}

	@Override
	public List<Occupants> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Occupants> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Occupants> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Occupants> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Occupants> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Occupants> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Occupants> find(String ParamName, Date date) {
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
	public List<Occupants> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OccupantsForm> getOccupantsFormByReportId(String reportId) {
		// TODO Auto-generated method stub
		Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(Occupants.class,"o1");
		criteria.createAlias("o1.crashReports", "c1");
		
		ProjectionList projectionList = Projections.projectionList();
		projectionList.add(Projections.property("o1.id.firstName"), "firstName");
		projectionList.add(Projections.property("o1.id.lastName"), "lastName");
		projectionList.add(Projections.property("o1.id.address"), "address");
		projectionList.add(Projections.property("o1.id.phoneNumber"), "phoneNumber");
		projectionList.add(Projections.property("o1.id.injuries"), "injuries");
		projectionList.add(Projections.property("o1.id.seatingPosition"), "seatingPosition");
		projectionList.add(Projections.property("o1.id.atFaultInsuranceCompany"), "atFaultInsuranceCompany");
		projectionList.add(Projections.property("o1.id.victimInsuranceCompany"), "victimInsuranceCompany");
		projectionList.add(Projections.property("o1.id.status"), "status");
		
		criteria.setProjection(projectionList);
		criteria.add(Restrictions.eq("o1.id.reportId", reportId));
		List<OccupantsForm> occupantsForms = criteria.setResultTransformer(new AliasToBeanResultTransformer(OccupantsForm.class)).list();
		return occupantsForms;
	}

	@Override
	public void deleteOccupantsByReportId(String reportId) {
		// TODO Auto-generated method stub
		Query deleteQuery=this.sessionFactory.getCurrentSession().createQuery("Delete from Occupants where crashReports.reportId='"+reportId+"'");
		deleteQuery.executeUpdate();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Occupants> getOccupantsByReportId(String reportId) {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(Occupants.class).add(Restrictions.eq("id.reportId", reportId)).list();
	}

	

}

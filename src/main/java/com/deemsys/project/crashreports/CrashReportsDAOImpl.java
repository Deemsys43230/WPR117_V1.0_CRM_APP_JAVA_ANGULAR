package com.deemsys.project.crashreports;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.deemsys.project.common.BasicQuery;
import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.CrashReports;

/**
 * 
 * @author Deemsys
 *
 */
@Repository
public class CrashReportsDAOImpl implements CrashReportsDAO{
	
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public void save(CrashReports entity) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().save(entity);
	}

	@Override
	public void merge(CrashReports crashReports) {
		// TODO Auto-generated method stub
		crashReports.setFileName(crashReports.getReportId()+"_"+crashReports.getReportNumber()+".pdf");
		this.sessionFactory.getCurrentSession().merge(crashReports);
	}	
	
	@Override
	public CrashReports get(Integer id) {
		// TODO Auto-generated method stub
		return (CrashReports) this.sessionFactory.getCurrentSession().get(CrashReports.class, id);
	}

	@Override
	public CrashReports update(CrashReports entity) {
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
	public List<CrashReports> getAll() {
		// TODO Auto-generated method stub
		return this.sessionFactory.getCurrentSession().createCriteria(CrashReports.class).list();
	}

	@Override
	public List<CrashReports> find(String paramName, String paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReports> find(String paramName, Long paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReports> find(String paramName, Integer paramValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReports> find(BasicQuery query) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReports> find(String queryString, String[] paramNames,
			String[] paramValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReports> find(String ParamName, Date date1, Date date2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CrashReports> find(String ParamName, Date date) {
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
	public List<CrashReports> getActiveList() {
		// TODO Auto-generated method stub
		return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public CrashReportsSearchResultSet searchCrashReports(
			CrashReportSearchForm crashReportSearchForm) {
		// TODO Auto-generated method stub
		Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria(CrashReports.class,"c1");
		criteria.createAlias("c1.occupantses", "o1");
		
		if(!crashReportSearchForm.getReportNumber().equals("")){
			Criterion reportNumberCriterion = Restrictions.eq("reportNumber", crashReportSearchForm.getReportNumber());
			criteria.add(reportNumberCriterion);
		}
		
		if(!crashReportSearchForm.getCrashDate().equals("")){
			Criterion crashDateCriterion = Restrictions.eq("crashDate", CRMConstants.convertYearFormat(crashReportSearchForm.getCrashDate()));
			criteria.add(crashDateCriterion);
		}
		
		if(!crashReportSearchForm.getLocation().equals("")){
			Criterion locationCriterion = Restrictions.eq("location", crashReportSearchForm.getLocation());
			criteria.add(locationCriterion);
		}
		
		if(!crashReportSearchForm.getAddedDate().equals("")){
			Criterion addedDateCriterion = Restrictions.eq("addedDate", CRMConstants.convertYearFormat(crashReportSearchForm.getAddedDate()));
			criteria.add(addedDateCriterion);
		}
		
		if(!crashReportSearchForm.getFirstName().equals("")){
			Criterion firstNameCriterion = Restrictions.like("o1.id.firstName", crashReportSearchForm.getFirstName(),MatchMode.ANYWHERE);
			criteria.add(firstNameCriterion);
		}
		
		if(!crashReportSearchForm.getLastName().equals("")){
			Criterion lastNameCriterion = Restrictions.like("o1.id.lastName", crashReportSearchForm.getLastName(),MatchMode.ANYWHERE);
			criteria.add(lastNameCriterion);
		}
		
		if(!crashReportSearchForm.getAccountId().equals("0"))
		  criteria.add(Restrictions.eq("accounts.accountId", crashReportSearchForm.getAccountId()));
		
		ProjectionList projectionList = Projections.projectionList();
		
		projectionList.add(Projections.property("c1.reportId"),"reportId");
		projectionList.add(Projections.property("c1.reportNumber"),"reportNumber");
		projectionList.add(Projections.property("c1.crashDate"),"crashDate");
		projectionList.add(Projections.property("c1.location"),"location");
		projectionList.add(Projections.property("c1.addedDate"),"addedDate");
		projectionList.add(Projections.property("c1.addedDateTime"),"addedDateTime");
		projectionList.add(Projections.property("c1.fileName"),"fileName");
		projectionList.add(Projections.property("c1.status"),"status");
		
		projectionList.add(Projections.property("o1.id.firstName"),"firstName");
		projectionList.add(Projections.property("o1.id.lastName"),"lastName");
		
		Long totalNoOfRecords = (Long) criteria.setProjection(Projections.count("c1.reportId")).uniqueResult();
		
		criteria.setProjection(projectionList);
		
		List<CrashReportSearchList> crashReportSearchLists = criteria.setResultTransformer(new AliasToBeanResultTransformer(CrashReportSearchList.class)).setFirstResult((crashReportSearchForm.getPageNumber()-1)*crashReportSearchForm.getItemsPerPage()).setMaxResults(crashReportSearchForm.getItemsPerPage()).list();
		
		CrashReportsSearchResultSet crashReportsSearchResultSet = new CrashReportsSearchResultSet(totalNoOfRecords, crashReportSearchLists);
		
		return crashReportsSearchResultSet;
	}

	@Override
	public void saveCrashReports(CrashReports crashReports) throws Exception {
		// TODO Auto-generated method stub
		try{
			crashReports.setFileName(crashReports.getReportId()+"_"+crashReports.getReportNumber()+".pdf");
			this.sessionFactory.getCurrentSession().save(crashReports);
		}catch(Exception ex){
			ex.printStackTrace();
			throw ex;
		}
		
	}

	@Override
	public CrashReports getReportsByReportId(String reportId) {
		// TODO Auto-generated method stub
		
		return (CrashReports) this.sessionFactory.getCurrentSession().createCriteria(CrashReports.class).add(Restrictions.eq("reportId", reportId)).uniqueResult();
	}

	@Override
	public void deleteCrashReports(CrashReports crashReports) {
		// TODO Auto-generated method stub
		this.sessionFactory.getCurrentSession().delete(crashReports);
	
	}

	

}

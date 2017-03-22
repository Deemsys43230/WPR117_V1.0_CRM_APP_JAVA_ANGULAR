package com.deemsys.project.crashreports;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
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
import com.deemsys.project.entity.Users;

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
		criteria.createAlias("c1.county", "co1");
		
		if(crashReportSearchForm.getReportNumber()!=null && !crashReportSearchForm.getReportNumber().equals("")){
			if(crashReportSearchForm.getSearchType()==0){
				Criterion reportNumberCriterion = Restrictions.eq("reportNumber", crashReportSearchForm.getReportNumber());
				criteria.add(reportNumberCriterion);
			}else{
				Criterion reportNumberCriterion = Restrictions.like("reportNumber", crashReportSearchForm.getReportNumber(),MatchMode.ANYWHERE);
				criteria.add(reportNumberCriterion);
			}
		}
		
		if(crashReportSearchForm.getCrashDate()!=null && !crashReportSearchForm.getCrashDate().equals("")){
			Criterion crashDateCriterion = Restrictions.eq("crashDate", CRMConstants.convertYearFormat(crashReportSearchForm.getCrashDate()));
			criteria.add(crashDateCriterion);
		}
		
		if(crashReportSearchForm.getLocation()!=null && !crashReportSearchForm.getLocation().equals("")){
			if(crashReportSearchForm.getSearchType()==0){
				Criterion locationCriterion = Restrictions.eq("location", crashReportSearchForm.getLocation());
				criteria.add(locationCriterion);
			}else{
				Criterion locationCriterion = Restrictions.like("location", crashReportSearchForm.getLocation(),MatchMode.ANYWHERE);
				criteria.add(locationCriterion);
			}
		}
		
		if(crashReportSearchForm.getAddedDate()!=null && !crashReportSearchForm.getAddedDate().equals("")){
			Criterion addedDateCriterion = Restrictions.eq("addedDate", CRMConstants.convertYearFormat(crashReportSearchForm.getAddedDate()));
			criteria.add(addedDateCriterion);
		}
		
		if(crashReportSearchForm.getFirstName()!=null && !crashReportSearchForm.getFirstName().equals("")){
			if(crashReportSearchForm.getSearchType()==0){
				Criterion firstNameCriterion = Restrictions.eq("o1.id.firstName", crashReportSearchForm.getFirstName());
				criteria.add(firstNameCriterion);
			}else{
				Criterion firstNameCriterion = Restrictions.like("o1.id.firstName", crashReportSearchForm.getFirstName(),MatchMode.ANYWHERE);
				criteria.add(firstNameCriterion);
			}
		}
		
		if(crashReportSearchForm.getLastName()!=null &&!crashReportSearchForm.getLastName().equals("")){
			if(crashReportSearchForm.getSearchType()==0){
				Criterion lastNameCriterion = Restrictions.eq("o1.id.lastName", crashReportSearchForm.getLastName());
				criteria.add(lastNameCriterion);
			}else{
				Criterion lastNameCriterion = Restrictions.like("o1.id.lastName", crashReportSearchForm.getLastName(),MatchMode.ANYWHERE);
				criteria.add(lastNameCriterion);
			}
		}
		
		if(!crashReportSearchForm.getAccountId().equals("0"))
		  criteria.add(Restrictions.eq("accounts.accountId", crashReportSearchForm.getAccountId()));
		
		ProjectionList projectionList = Projections.projectionList();
		
		projectionList.add(Projections.property("c1.reportId"),"reportId");
		projectionList.add(Projections.property("c1.reportNumber"),"reportNumber");
		projectionList.add(Projections.property("c1.crashDate"),"crashDate");
		projectionList.add(Projections.property("co1.name"),"countyName");
		projectionList.add(Projections.property("c1.location"),"location");
		projectionList.add(Projections.property("c1.noOfOccupants"),"noOfOccupants");
		projectionList.add(Projections.property("c1.addedDate"),"addedDate");
		projectionList.add(Projections.property("c1.addedDateTime"),"addedDateTime");
		projectionList.add(Projections.property("c1.fileName"),"fileName");
		projectionList.add(Projections.property("c1.status"),"status");
		
		projectionList.add(Projections.property("o1.id.firstName"),"firstName");
		projectionList.add(Projections.property("o1.id.lastName"),"lastName");
		projectionList.add(Projections.property("o1.id.crashSeverity"),"crashSeverity");
		projectionList.add(Projections.property("o1.id.address"),"address");
		projectionList.add(Projections.property("o1.id.phoneNumber"),"phoneNumber");
		projectionList.add(Projections.property("o1.id.atFaultInsuranceCompany"),"atFaultInsuranceCompany");
		projectionList.add(Projections.property("o1.id.victimInsuranceCompany"),"victimInsuranceCompany");
		
		Long totalNoOfRecords = (Long) criteria.setProjection(Projections.count("c1.reportId")).uniqueResult();
		
		criteria.setProjection(projectionList);
		
		// Set Order
		criteria.addOrder(Order.desc("c1.addedDateTime"));
		
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

	@Override
	public Integer checkReportNumberExist(String reportNumber) {
		// TODO Auto-generated method stub
		CrashReports crashReports =(CrashReports) this.sessionFactory.getCurrentSession().createCriteria(CrashReports.class).add(Restrictions.eq("reportNumber", reportNumber)).uniqueResult();
		if(crashReports!=null){
			return 1;
		}else{
			return 0;
		}
		
	}

	@Override
	public Integer checkReportNumberExist(String reportId, String reportNumber) {
		// TODO Auto-generated method stub
		CrashReports crashReports =(CrashReports) this.sessionFactory.getCurrentSession().createCriteria(CrashReports.class).add(Restrictions.and(Restrictions.ne("reportId", reportId),Restrictions.eq("reportNumber", reportNumber))).uniqueResult();
		if(crashReports!=null){
			return 1;
		}else{
			return 0;
		}
	}

	

}

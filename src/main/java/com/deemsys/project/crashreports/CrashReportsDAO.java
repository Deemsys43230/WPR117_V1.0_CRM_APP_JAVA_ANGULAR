package com.deemsys.project.crashreports;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.CrashReports;
/**
 * 
 * @author Deemsys
 *
 */
public interface CrashReportsDAO extends IGenericDAO<CrashReports>{
	
	public void saveCrashReports(CrashReports crashReports) throws Exception;
	public CrashReportsSearchResultSet searchCrashReports(CrashReportSearchForm crashReportSearchForm);
	public CrashReports getReportsByReportId(String reportId);
	public void deleteCrashReports(CrashReports crashReports);
	public Integer checkReportNumberExist(String reportNumber,String crashDate,Integer countyId);
	public Integer checkReportNumberExist(String reportId,String reportNumber,String crashDate,Integer countyId);
	public Long getReportsCountBasedOnVerifiedStatus(String verifyAccountId,Integer verifiedStatus);
}

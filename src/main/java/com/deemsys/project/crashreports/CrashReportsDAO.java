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
}

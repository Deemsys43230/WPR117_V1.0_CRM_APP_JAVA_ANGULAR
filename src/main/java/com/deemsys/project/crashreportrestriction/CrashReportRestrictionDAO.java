package com.deemsys.project.crashreportrestriction;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.CrashReportRestriction;
/**
 * 
 * @author Deemsys
 *
 */
public interface CrashReportRestrictionDAO extends IGenericDAO<CrashReportRestriction>{
	public CrashReportRestriction getCrashReportRestrictionByClintIP(String clientIP);
}

package com.deemsys.project.verificationlog;

import java.util.List;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.VerificationLog;
/**
 * 
 * @author Deemsys
 *
 */
public interface VerificationLogDAO extends IGenericDAO<VerificationLog>{
	public List<VerificationLog> getVerificationLogsByReport(String reportId);
}

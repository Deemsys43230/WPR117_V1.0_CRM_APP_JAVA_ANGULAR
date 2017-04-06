package com.deemsys.project.checkeruploadermapping;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.CheckerUploaderMapping;
/**
 * 
 * @author Deemsys
 *
 */
public interface CheckerUploaderMappingDAO extends IGenericDAO<CheckerUploaderMapping>{
	public CheckerUploaderMapping getCheckerUploaderMappingByUploader(String accountId);
}

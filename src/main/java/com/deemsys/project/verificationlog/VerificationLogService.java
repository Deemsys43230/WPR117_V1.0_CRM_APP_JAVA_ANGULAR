package com.deemsys.project.verificationlog;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.accounts.AccountsDAO;
import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.CrashReports;
import com.deemsys.project.entity.VerificationLog;
/**
 * 
 * @author Deemsys
 *
 * VerificationLog 	 - Entity
 * verificationLog 	 - Entity Object
 * verificationLogs 	 - Entity List
 * verificationLogDAO   - Entity DAO
 * verificationLogForms - EntityForm List
 * VerificationLogForm  - EntityForm
 *
 */
@Service
@Transactional
public class VerificationLogService {

	@Autowired
	VerificationLogDAO verificationLogDAO;
	
	@Autowired
	AccountsDAO accountsDAO;
	
	public List<VerificationLogForm> getVerificationLogListByReport(String reportId)
	{
		List<VerificationLogForm> verificationLogForms=new ArrayList<VerificationLogForm>();
		
		List<VerificationLog> verificationLogs=new ArrayList<VerificationLog>();
		
		verificationLogs=verificationLogDAO.getVerificationLogsByReport(reportId);
		
		for (VerificationLog verificationLog : verificationLogs) {
			//TODO: Fill the List
			VerificationLogForm verificationLogForm = new VerificationLogForm(verificationLog.getVerificationLogId(), verificationLog.getAccounts().getAccountId(), verificationLog.getAccounts().getLastName()+" "+verificationLog.getAccounts().getFirstName(), reportId, verificationLog.getVerifiedNotes(), CRMConstants.convertUSAFormatWithTime(verificationLog.getVerifiedDateTime()), verificationLog.getVerifiedStatus(), verificationLog.getStatus());
			verificationLogForms.add(verificationLogForm);
		}
		
		return verificationLogForms;
	}
	
	//Get Particular Entry
	public VerificationLogForm getVerificationLog(Integer getId)
	{
		VerificationLog verificationLog=new VerificationLog();
		
		verificationLog=verificationLogDAO.get(getId);
		
		//TODO: Convert Entity to Form
		//Start
		
		VerificationLogForm verificationLogForm=new VerificationLogForm();
		
		//End
		
		return verificationLogForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeVerificationLog(VerificationLogForm verificationLogForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		VerificationLog verificationLog=new VerificationLog();
		
		//Logic Ends
		
		
		verificationLogDAO.merge(verificationLog);
		return 1;
	}
	
	//Save an Entry
	public int saveVerificationLog(VerificationLogForm verificationLogForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		Accounts accounts = accountsDAO.getAccountsById(verificationLogForm.getVerifiedAccountId());
		CrashReports crashReports = new CrashReports();
		crashReports.setReportId(verificationLogForm.getReportId());
		VerificationLog verificationLog=new VerificationLog(accounts, crashReports, verificationLogForm.getVerifiedNotes(), CRMConstants.convertYearFormatWithTime24Hr(verificationLogForm.getVerifiedDateTime()), verificationLogForm.getVerifiedStatus(), verificationLogForm.getStatus());
		
		//Logic Ends
		
		verificationLogDAO.save(verificationLog);
		return 1;
	}
	
	//Update an Entry
	public int updateVerificationLog(VerificationLogForm verificationLogForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		VerificationLog verificationLog=new VerificationLog();
		
		//Logic Ends
		
		verificationLogDAO.update(verificationLog);
		return 1;
	}
	
	//Delete an Entry
	public int deleteVerificationLog(Integer id)
	{
		verificationLogDAO.delete(id);
		return 1;
	}
	
	
	
}

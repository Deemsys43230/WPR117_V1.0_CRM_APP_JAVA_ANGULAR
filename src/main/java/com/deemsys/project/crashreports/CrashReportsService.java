package com.deemsys.project.crashreports;

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
import com.deemsys.project.entity.Occupants;
import com.deemsys.project.entity.OccupantsId;
import com.deemsys.project.login.LoginService;
import com.deemsys.project.occupants.OccupantsDAO;
import com.deemsys.project.occupants.OccupantsForm;
/**
 * 
 * @author Deemsys
 *
 * CrashReports 	 - Entity
 * crashReports 	 - Entity Object
 * crashReportss 	 - Entity List
 * crashReportsDAO   - Entity DAO
 * crashReportsForms - EntityForm List
 * CrashReportsForm  - EntityForm
 *
 */
@Service
@Transactional
public class CrashReportsService {

	@Autowired
	CrashReportsDAO crashReportsDAO;
	
	@Autowired
	LoginService loginService;
	
	@Autowired
	AccountsDAO accountsDAO;
	
	@Autowired
	OccupantsDAO occupantsDAO;
	
	//Get All Entries
	public CrashReportsSearchResult searchCrashReportsList(CrashReportSearchForm crashReportSearchForm)
	{
		CrashReportsSearchResult crashReportsSearchResult = new CrashReportsSearchResult();
		
		crashReportSearchForm.setAccountId(loginService.getCurrentAccountId());
		
		CrashReportsSearchResultSet crashReportsSearchResultSet=crashReportsDAO.searchCrashReports(crashReportSearchForm);
		
		String reportNumber="";
		int rowCount=0;
		List<CrashReportsResultByGroup> crashReportsResultByGroupList = new ArrayList<CrashReportsResultByGroup>();
		CrashReportsResultByGroup crashReportsResultByGroup = new CrashReportsResultByGroup();
		for (CrashReportSearchList crashReportSearchList : crashReportsSearchResultSet.getCrashReportSearchLists()) {
			//TODO: Fill the List
			if(!reportNumber.equals(crashReportSearchList.getReportId())){
				reportNumber=crashReportSearchList.getReportNumber();
				if(rowCount!=0){
					crashReportsResultByGroupList.add(crashReportsResultByGroup);
				}
				crashReportsResultByGroup=new CrashReportsResultByGroup(crashReportSearchList.getReportId(), crashReportSearchList.getReportNumber(), crashReportSearchList.getCrashDate(), crashReportSearchList.getAddedDate(), crashReportSearchList.getAddedDateTime(), crashReportSearchList.getStatus(), crashReportSearchList.getFileName(), new ArrayList<OccupantsForm>());
			}
			// Set Occupants
			crashReportsResultByGroup.getOccupantsForms().add(new OccupantsForm(crashReportSearchList.getFirstName(), crashReportSearchList.getLastName(), 1));
			rowCount++;
		}
		if(rowCount>0)
			crashReportsResultByGroupList.add(crashReportsResultByGroup);

		crashReportsSearchResult=new CrashReportsSearchResult(crashReportsSearchResultSet.getTotalRecords(), crashReportsResultByGroupList);
		
		return crashReportsSearchResult;
	}
	
	//Get Particular Entry
	public CrashReportsForm getCrashReports(Integer getId)
	{
		CrashReports crashReports=new CrashReports();
		
		crashReports=crashReportsDAO.get(getId);
		
		//TODO: Convert Entity to Form
		//Start
		
		CrashReportsForm crashReportsForm=new CrashReportsForm();
		
		//End
		
		return crashReportsForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeCrashReports(CrashReportsForm crashReportsForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		CrashReports crashReports=new CrashReports();
		
		//Logic Ends
		
		
		crashReportsDAO.merge(crashReports);
		return 1;
	}
	
	//Save an Entry
	public int saveCrashReports(CrashReportsForm crashReportsForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		try {
			Accounts accounts = accountsDAO.getAccountsById(loginService.getCurrentAccountId());
			
			CrashReports crashReports=new CrashReports(null, accounts, crashReportsForm.getReportNumber(),  CRMConstants.convertYearFormat(crashReportsForm.getCrashDate()), null,  new Date(), new Date(), 1, null);

			crashReportsDAO.saveCrashReports(crashReports);

			for (OccupantsForm occupantsForm : crashReportsForm.getOccupantsForms()) {
				OccupantsId occupantsId = new OccupantsId(crashReports.getReportId(), occupantsForm.getFirstName(), occupantsForm.getLastName(), 1);
				Occupants occupants = new Occupants(occupantsId, crashReports);
				occupantsDAO.save(occupants);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//Logic Ends
		
		return 1;
	}
	
	//Update an Entry
	public int updateCrashReports(CrashReportsForm crashReportsForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		CrashReports crashReports=new CrashReports();
		
		//Logic Ends
		
		crashReportsDAO.update(crashReports);
		return 1;
	}
	
	//Delete an Entry
	public int deleteCrashReports(Integer id)
	{
		crashReportsDAO.delete(id);
		return 1;
	}
	
	
	
}

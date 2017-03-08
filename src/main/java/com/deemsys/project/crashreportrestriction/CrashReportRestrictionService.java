package com.deemsys.project.crashreportrestriction;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.joda.time.DateTime;
import org.joda.time.Hours;
import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.CrashReportRestriction;
/**
 * 
 * @author Deemsys
 *
 * CrashReportRestriction 	 - Entity
 * crashReportRestriction 	 - Entity Object
 * crashReportRestrictions 	 - Entity List
 * crashReportRestrictionDAO   - Entity DAO
 * crashReportRestrictionForms - EntityForm List
 * CrashReportRestrictionForm  - EntityForm
 *
 */
@Service
@Transactional
public class CrashReportRestrictionService {

	@Autowired
	CrashReportRestrictionDAO crashReportRestrictionDAO;
	
	//Get All Entries
	public List<CrashReportRestrictionForm> getCrashReportRestrictionList()
	{
		List<CrashReportRestrictionForm> crashReportRestrictionForms=new ArrayList<CrashReportRestrictionForm>();
		
		List<CrashReportRestriction> crashReportRestrictions=new ArrayList<CrashReportRestriction>();
		
		crashReportRestrictions=crashReportRestrictionDAO.getAll();
		
		for (CrashReportRestriction crashReportRestriction : crashReportRestrictions) {
			//TODO: Fill the List
			
		}
		
		return crashReportRestrictionForms;
	}
	
	//Get Particular Entry
	public CrashReportRestrictionForm getCrashReportRestriction(Integer getId)
	{
		CrashReportRestriction crashReportRestriction=new CrashReportRestriction();
		
		crashReportRestriction=crashReportRestrictionDAO.get(getId);
		
		//TODO: Convert Entity to Form
		//Start
		
		CrashReportRestrictionForm crashReportRestrictionForm=new CrashReportRestrictionForm();
		
		//End
		
		return crashReportRestrictionForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeCrashReportRestriction(CrashReportRestrictionForm crashReportRestrictionForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		CrashReportRestriction crashReportRestriction=new CrashReportRestriction(crashReportRestrictionForm.getClientIp(), new DateTime().toDate(), crashReportRestrictionForm.getStatus());

		crashReportRestrictionDAO.merge(crashReportRestriction);
		//Logic Ends
		return 1;
	}
	
	//Save an Entry
	public int saveCrashReportRestriction(CrashReportRestrictionForm crashReportRestrictionForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		CrashReportRestriction crashReportRestriction=new CrashReportRestriction();
		
		//Logic Ends
		
		crashReportRestrictionDAO.save(crashReportRestriction);
		return 1;
	}
	
	//Update an Entry
	public int updateCrashReportRestriction(CrashReportRestrictionForm crashReportRestrictionForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		CrashReportRestriction crashReportRestriction=new CrashReportRestriction();
		
		//Logic Ends
		
		crashReportRestrictionDAO.update(crashReportRestriction);
		return 1;
	}
	
	//Delete an Entry
	public int deleteCrashReportRestriction(Integer id)
	{
		crashReportRestrictionDAO.delete(id);
		return 1;
	}
	
	// Get Crash Report Restriction Status
	public Integer getCrashReportRestrictionStatus(String clientIP)
	{
		CrashReportRestriction crashReportRestriction = crashReportRestrictionDAO
				.getCrashReportRestrictionByClintIP(clientIP);

		Integer isAccessable = 1;
		// TODO: Convert Entity to Form
		// Start
		if (crashReportRestriction != null) {
			LocalDateTime currentDateTime = new LocalDateTime();
			LocalDateTime lastAccessedDateTime = new LocalDateTime(
					crashReportRestriction.getLastAccessTime());
			int hours = Hours.hoursBetween(lastAccessedDateTime,
					currentDateTime).getHours();
			System.out.println("Hours-->"+hours);
			if (hours>=24) {
				isAccessable = 1;
			} else {
				isAccessable = 0;
			}
		} else {
			isAccessable = 1;
		}

		// End

		return isAccessable;
	}
	
}

package com.deemsys.project.policeDepartment;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.deemsys.project.AWS.AWSFileUpload;
import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.common.CRMProperties;
import com.deemsys.project.county.CountyDAO;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.County;
import com.deemsys.project.entity.PoliceDepartment;

/**
 * 
 * @author Deemsys
 *
 *         PoliceDepartment - Entity policeDepartment - Entity Object
 *         policeDepartments - Entity List policeDepartmentDAO - Entity DAO
 *         policeDepartmentForms - EntityForm List PoliceDepartmentForm -
 *         EntityForm
 *
 */
@Service
@Transactional
public class PoliceDepartmentService {

	@Autowired
	PoliceDepartmentDAO policeDepartmentDAO;

	@Autowired
	CountyDAO countyDAO;

	@Autowired
	AWSFileUpload awsFileUpload;
	
	
	@Autowired
	CRMProperties crmProperties;
	
	
	
	// Get All Entries
	public List<PoliceDepartmentForm> getPoliceDepartmentList() {
		List<PoliceDepartmentForm> policeDepartmentForms = new ArrayList<PoliceDepartmentForm>();

		List<PoliceDepartment> policeDepartments = new ArrayList<PoliceDepartment>();

		policeDepartments = policeDepartmentDAO.getAll();

		for (PoliceDepartment policeDepartment : policeDepartments) {
			// TODO: Fill the List
			PoliceDepartmentForm policeDepartmentForm = new PoliceDepartmentForm(
					policeDepartment.getPoliceDepartmentId(), policeDepartment.getCounty().getCountyId(),
					policeDepartment.getCounty().getName(), policeDepartment.getName(), policeDepartment.getCode(),
					policeDepartment.getLoginLink(), policeDepartment.getSearchLink(),
					CRMConstants.convertUSAFormatWithTime(policeDepartment.getCreatedDateTime()),
					policeDepartment.getStatus(), policeDepartment.getIsEnabled(), null);
			policeDepartmentForms.add(policeDepartmentForm);
		}

		return policeDepartmentForms;
	}

	// Get Particular Entry
	public PoliceDepartmentForm getPoliceDepartment(Integer policeDepartmentId) {
		PoliceDepartment policeDepartment = policeDepartmentDAO.getPoliceDepartmentById(policeDepartmentId);

		// TODO: Convert Entity to Form
		// Start
		
		String innerFolderName="/reports";
		String bannerFolderName="/banner";
		String url=crmProperties.getProperty("bucketURL")+policeDepartmentId.toString()+bannerFolderName+"/banner.jpg";

		PoliceDepartmentForm policeDepartmentForm = new PoliceDepartmentForm(policeDepartment.getPoliceDepartmentId(),
				policeDepartment.getCounty().getCountyId(), policeDepartment.getCounty().getName(),
				policeDepartment.getName(), policeDepartment.getCode(), policeDepartment.getLoginLink(),
				policeDepartment.getSearchLink(),
				CRMConstants.convertUSAFormatWithTime(policeDepartment.getCreatedDateTime()),
				policeDepartment.getStatus(), policeDepartment.getIsEnabled(),url);

		// End

		return policeDepartmentForm;
	}

	public PoliceDepartmentForm getPoliceDepartmentByLink(String departmentLinkParam, String departmentValue)
			throws NullPointerException, Exception {
		PoliceDepartmentForm policeDepartmentForm = null;
		try {
			List<PoliceDepartment> policeDepartments = policeDepartmentDAO.find(departmentLinkParam, departmentValue);

			// TODO: Convert Entity to Form
			// Start
			for (PoliceDepartment policeDepartment : policeDepartments) {
				policeDepartmentForm = new PoliceDepartmentForm(policeDepartment.getPoliceDepartmentId(),
						policeDepartment.getCounty().getCountyId(), policeDepartment.getCounty().getName(),
						policeDepartment.getName(), policeDepartment.getCode(), policeDepartment.getLoginLink(),
						policeDepartment.getSearchLink(),
						CRMConstants.convertUSAFormatWithTime(policeDepartment.getCreatedDateTime()),
						policeDepartment.getStatus(), policeDepartment.getIsEnabled(), null);
			}

			return policeDepartmentForm;
		} catch (NullPointerException nullPointerException) {
			throw nullPointerException;
		} catch (Exception e) {
			// TODO: handle exception
			throw e;
		}
	}

	// Merge an Entry (Save or Update)
	public int mergePoliceDepartment(PoliceDepartmentForm policeDepartmentForm) {
		// TODO: Convert Form to Entity Here

		// Logic Starts
		// County
		County county = countyDAO.get(policeDepartmentForm.getCountyId());

		// PoliceDepartment policeDepartment=new PoliceDepartment(county,
		// policeDepartmentForm.getName(),
		// policeDepartmentForm.getCode(),policeDepartmentForm.getLoginLink(),policeDepartmentForm.getSearchLink(),
		// CRMConstants.convertYearFormatWithTime(CRMConstants.convertUSAFormatWithTime(new
		// Date())), policeDepartmentForm.getStatus(),1,null, null);
		PoliceDepartment policeDepartment = new PoliceDepartment(county, policeDepartmentForm.getName(),
				policeDepartmentForm.getCode(), policeDepartmentForm.getLoginLink(),
				policeDepartmentForm.getSearchLink(),
				CRMConstants.convertYearFormatWithTime24Hr(policeDepartmentForm.getCreatedDateTime()),
				policeDepartmentForm.getStatus(), 1, null, null);

		policeDepartment.setPoliceDepartmentId(policeDepartmentForm.getPoliceDepartmentId());
		// Logic Ends

		policeDepartmentDAO.merge(policeDepartment);
		
		return policeDepartment.getPoliceDepartmentId();
	}

	// Save an Entry
	public int savePoliceDepartment(PoliceDepartmentForm policeDepartmentForm) {

		County county = countyDAO.get(policeDepartmentForm.getCountyId());
		// PoliceDepartment policeDepartment=new PoliceDepartment(county,
		// policeDepartmentForm.getName(), policeDepartmentForm.getCode(),
		// policeDepartmentForm.getLoginLink(),
		// policeDepartmentForm.getSearchLink(),
		// CRMConstants.convertYearFormatWithTime(policeDepartmentForm.getCreatedDateTime()),
		// policeDepartmentForm.getStatus(),1, null, null);

		PoliceDepartment policeDepartment = new PoliceDepartment(county, policeDepartmentForm.getName(),
				policeDepartmentForm.getCode(), policeDepartmentForm.getLoginLink(),
				policeDepartmentForm.getSearchLink(),new Date(),
				policeDepartmentForm.getStatus(), 1, null, null);

		policeDepartmentDAO.save(policeDepartment);
        
		return policeDepartment.getPoliceDepartmentId();
	}

	// Update an Entry
	public int updatePoliceDepartment(PoliceDepartmentForm policeDepartmentForm) {
		// TODO: Convert Form to Entity Here

		// Logic Starts

		County county = countyDAO.get(policeDepartmentForm.getCountyId());

		PoliceDepartment policeDepartment = new PoliceDepartment(county, policeDepartmentForm.getName(),
				policeDepartmentForm.getCode(), policeDepartmentForm.getLoginLink(),
				policeDepartmentForm.getSearchLink(),
				CRMConstants.convertYearFormatWithTime(policeDepartmentForm.getCreatedDateTime()),
				policeDepartmentForm.getStatus(), policeDepartmentForm.getIsEnabled(), null, null);
		policeDepartment.setPoliceDepartmentId(policeDepartmentForm.getPoliceDepartmentId());

		// Logic Ends

		policeDepartmentDAO.update(policeDepartment);
		return 1;
	}

	// Delete an Entry
	public int deletePoliceDepartment(Integer id)
	{
		policeDepartmentDAO.delete(id);
		return 1;
	}

	public int enableOrDisableDepartment(Integer policeDepartmentId) {
		PoliceDepartment policeDepartment = policeDepartmentDAO.getPoliceDepartmentById(policeDepartmentId);

		if (policeDepartment.getIsEnabled() == 1) {
			policeDepartment.setIsEnabled(0);
		} else {
			policeDepartment.setIsEnabled(1);
		}

		policeDepartmentDAO.update(policeDepartment);

		return 1;

	}

	public String uploadPoliceDepartment(MultipartFile policeDepartmentFile, Integer policeDepartmentId) 
	{
		
		
		
		String fileName=crmProperties.getProperty("fileName");
		
		String bannerFolderName=crmProperties.getProperty("bannerFolderName");
   
		String path=crmProperties.getProperty("logoTempFolder")+policeDepartmentId.toString()+bannerFolderName;

	    try {
		
	    	File f=new File(path);
	    	
	    	if(!f.exists())
	    	{
	    		f.mkdir();
	    	}
	    	
 	
 String filePath=path+"//banner.jpg";
	   
 if(crmProperties.getProperty("awsUpload").equals("1"))
 {
 
			
    File file=CRMConstants.saveTemporaryFile(policeDepartmentFile, filePath);
    
   
   
   awsFileUpload.uploadFileToAWSS3(filePath, fileName,policeDepartmentId,2);
   
  file.delete();
    }
		}
		catch (IllegalStateException e)
		{
			
			e.printStackTrace();
		} 
		catch (IOException e) 
		{
			
			e.printStackTrace();
		}
		return null;
		}

	
public String uploadPoliceDepartmentWithoutFile(Integer policeDepartmentId) throws IOException 
{
String path=crmProperties.getProperty("logoTempFolder")+policeDepartmentId.toString();




String bannerFolderName=crmProperties.getProperty("bannerFolderName");

String locallink=crmProperties.getProperty("locallink");

File srcFolder=new File(locallink);

File destinationFolder=new File(path);

if(!destinationFolder.exists())
{
	destinationFolder.mkdir();
}

path=path+bannerFolderName+"//banner.jpg";

destinationFolder=new File(path);

if(crmProperties.getProperty("awsUpload").equals("1"))
{
FileUtils.copyFile(srcFolder,destinationFolder);

String fileName=crmProperties.getProperty("fileName");


String filePath=path;
awsFileUpload.uploadFileToAWSS3(filePath, fileName,policeDepartmentId,2);
destinationFolder.delete();
}
return null;
}
	

	public int checkDepartmentName(String name,Integer policeDepartmentId)
	{
		
		return policeDepartmentDAO.checkDepartmentName(name,policeDepartmentId);
	}

	
	public int checkDepartmentCode(String code,Integer policeDepartmentId)
	{
		
		return policeDepartmentDAO.checkDepartmentCode(code,policeDepartmentId);
	}


	public int checkDepartmentLogin(String login,Integer policeDepartmentId)
	{
		
		return policeDepartmentDAO.checkDepartmentLogin(login,policeDepartmentId);
	}
	
	public int checkDepartmentSearch(String search,Integer policeDepartmentId)
	{
		
		return policeDepartmentDAO.checkDepartmentSearch(search,policeDepartmentId);
	}

	
	
	

}

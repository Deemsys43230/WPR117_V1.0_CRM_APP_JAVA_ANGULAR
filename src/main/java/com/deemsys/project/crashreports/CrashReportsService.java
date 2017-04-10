package com.deemsys.project.crashreports;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.deemsys.project.APIRequest.APIRequestService;
import com.deemsys.project.APIRequest.CrashReportForm;
import com.deemsys.project.APIRequest.PatientForm;
import com.deemsys.project.AWS.AWSFileUpload;
import com.deemsys.project.accounts.AccountsDAO;
import com.deemsys.project.checkeruploadermapping.CheckerUploaderMappingDAO;
import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.common.CRMProperties;
import com.deemsys.project.county.CountyDAO;
import com.deemsys.project.entity.Accounts;
import com.deemsys.project.entity.CheckerUploaderMapping;
import com.deemsys.project.entity.County;
import com.deemsys.project.entity.CrashReports;
import com.deemsys.project.entity.Occupants;
import com.deemsys.project.entity.OccupantsId;
import com.deemsys.project.login.LoginService;
import com.deemsys.project.occupants.OccupantsDAO;
import com.deemsys.project.occupants.OccupantsForm;
import com.deemsys.project.verificationlog.VerificationLogForm;
import com.deemsys.project.verificationlog.VerificationLogService;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
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
	
	@Autowired
	AWSFileUpload awsFileUpload;
	
	@Autowired
	CRMProperties crmProperties;
	
	@Autowired
	CountyDAO countyDAO;
	
	@Autowired
	APIRequestService apiRequestService;
	
	@Autowired
	VerificationLogService verificationLogService;
	
	@Autowired
	CheckerUploaderMappingDAO checkerUploaderMappingDAO;
	
	//Get All Entries
	public CrashReportsSearchResult searchCrashReportsList(CrashReportSearchForm crashReportSearchForm)
	{
		CrashReportsSearchResult crashReportsSearchResult = new CrashReportsSearchResult();
		
		if(!crashReportSearchForm.getSearchType().equals("0")){
			String currentAccountId=loginService.getCurrentAccountId();
			crashReportSearchForm.setAccountId(currentAccountId);
		}
		  
		CrashReportsSearchResultSet crashReportsSearchResultSet=crashReportsDAO.searchCrashReports(crashReportSearchForm);
		
		String reportId="";
		int rowCount=0;
		List<CrashReportsResultByGroup> crashReportsResultByGroupList = new ArrayList<CrashReportsResultByGroup>();
		CrashReportsResultByGroup crashReportsResultByGroup = new CrashReportsResultByGroup();
		for (CrashReportSearchList crashReportSearchList : crashReportsSearchResultSet.getCrashReportSearchLists()) {
			//TODO: Fill the List
			if(!reportId.equals(crashReportSearchList.getReportId())){
				reportId=crashReportSearchList.getReportId();
				if(rowCount!=0){
					crashReportsResultByGroupList.add(crashReportsResultByGroup);
				}
				crashReportsResultByGroup=new CrashReportsResultByGroup(crashReportSearchList.getReportId(), crashReportSearchList.getReportNumber(), crashReportSearchList.getCrashDate(), crashReportSearchList.getCountyName(), crashReportSearchList.getLocation(), crashReportSearchList.getCrashSeverity(), crashReportSearchList.getAddedDate(), crashReportSearchList.getAddedDateTime(), crashReportSearchList.getStatus(), crmProperties.getProperty("bucketURL")+crashReportSearchList.getFileName(), crashReportSearchList.getNoOfOccupants(), crashReportSearchList.getVerifiedStatus(), crashReportSearchList.getLastVerifiedDateTime(), crashReportSearchList.getLastVerifiedNotes(), new ArrayList<OccupantsForm>());
			}
			// Set Occupants
			crashReportsResultByGroup.getOccupantsForms().add(new OccupantsForm(crashReportSearchList.getFirstName(), crashReportSearchList.getLastName(), crashReportSearchList.getAddress(), crashReportSearchList.getPhoneNumber(), crashReportSearchList.getInjuries(), crashReportSearchList.getSeatingPosition(), crashReportSearchList.getAtFaultInsuranceCompany(), crashReportSearchList.getVictimInsuranceCompany(), 1));
			rowCount++;
		}
		if(rowCount>0)
			crashReportsResultByGroupList.add(crashReportsResultByGroup);
			
		crashReportsSearchResult=new CrashReportsSearchResult(crashReportsSearchResultSet.getTotalRecords(), crashReportsResultByGroupList);
		
		return crashReportsSearchResult;
	}
	
	//Get Particular Entry
	public CrashReportsForm getCrashReports(String reportId)
	{
		CrashReports crashReports=crashReportsDAO.getReportsByReportId(reportId);
		
		//TODO: Convert Entity to Form
		//Start
		List<OccupantsForm> occupantsForms = occupantsDAO.getOccupantsFormByReportId(reportId);
		String verifiyAccountId=null;
		if(crashReports.getAccountsByVerifyAccountId()!=null){
			verifiyAccountId=crashReports.getAccountsByVerifyAccountId().getAccountId();
		}
		CrashReportsForm crashReportsForm=new CrashReportsForm(crashReports.getReportId(), verifiyAccountId, crashReports.getReportNumber(), CRMConstants.convertMonthFormat(crashReports.getCrashDate()), crashReports.getCounty().getCountyId(), crashReports.getLocation(), crashReports.getCrashSeverity(), crashReports.getFileName(), crmProperties.getProperty("bucketURL")+crashReports.getFileName(), CRMConstants.convertMonthFormat(crashReports.getAddedDate()), CRMConstants.convertUSAFormatWithTime(crashReports.getAddedDateTime()), crashReports.getVerifiedStatus(), crashReports.getStatus(), occupantsForms);
		
		//End
		
		return crashReportsForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeCrashReports(CrashReportsForm crashReportsForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		try {
			String fileName=crashReportsForm.getReportId()+".pdf";
			
			// County Data
			County county = countyDAO.get(crashReportsForm.getCountyId());
			
			Date addedDate = new Date();
			Date addedDateTime = new Date();
			if(crashReportsForm.getAddedDate()!=null){
				addedDate=CRMConstants.convertYearFormat(crashReportsForm.getAddedDate());
			}
			
			if(crashReportsForm.getAddedDateTime()!=null){
				addedDateTime=CRMConstants.convertYearFormatWithTime24Hr(crashReportsForm.getAddedDateTime());
			}
			/*
			// Get Verified Accounts Details
			Accounts verifiedAccounts=new Accounts();
			if(crashReportsForm.getVerifyAccountId()!=null&&!crashReportsForm.getVerifyAccountId().equals("")){
				verifiedAccounts.setAccountId(crashReportsForm.getVerifyAccountId());
			}
			*/
			CrashReports crashReports=crashReportsDAO.getReportsByReportId(crashReportsForm.getReportId());
			crashReports.setReportId(crashReportsForm.getReportId());
			crashReports.setCounty(county);
			crashReports.setReportNumber(crashReportsForm.getReportNumber());
			crashReports.setCrashDate(CRMConstants.convertYearFormat(crashReportsForm.getCrashDate()));
			crashReports.setLocation(crashReportsForm.getLocation());
			crashReports.setCrashSeverity(crashReportsForm.getCrashSeverity());
			crashReports.setNoOfOccupants(crashReportsForm.getOccupantsForms().size());
			crashReports.setAddedDate(addedDate);
			crashReports.setAddedDateTime(addedDateTime);
			Integer verifiedStatus = crashReportsForm.getVerifiedStatus();
			if(crashReportsForm.getIsChecker()){
				verifiedStatus=Integer.parseInt(crmProperties.getProperty("verifiedSuccessfully"));
			}
			crashReports.setVerifiedStatus(verifiedStatus);
			crashReports.setStatus(1);
			crashReports.setFileName(fileName);
			crashReportsDAO.merge(crashReports);

			// Delete Occupants 
			occupantsDAO.deleteOccupantsByReportId(crashReportsForm.getReportId());
			
			List<PatientForm> patientForms = new ArrayList<PatientForm>();
			
			// Insert Occupants
			Integer sequenceNo=1;
			for (OccupantsForm occupantsForm : crashReportsForm.getOccupantsForms()) {
				// Is Checker is True
				if(crashReportsForm.getIsChecker()){
					PatientForm patientForm = new PatientForm(crashReportsForm.getReportNumber(), occupantsForm.getLastName()+", "+occupantsForm.getFirstName(), crashReportsForm.getCrashDate(), crashReportsForm.getCrashSeverity()!=0?crashReportsForm.getCrashSeverity().toString():"", occupantsForm.getAddress(), occupantsForm.getPhoneNumber(), occupantsForm.getAtFaultInsuranceCompany(), occupantsForm.getVictimInsuranceCompany(),
							"","",0,"","","","",crashReportsForm.getCountyId(),"","","","","","",0,"",new Double(0),new Double(0),occupantsForm.getInjuries(),"","","","",0,occupantsForm.getSeatingPosition(),1,"",1,1);
					patientForms.add(patientForm);
				}
				
				OccupantsId occupantsId = new OccupantsId(crashReports.getReportId(), occupantsForm.getFirstName(), occupantsForm.getLastName(), occupantsForm.getAddress(), occupantsForm.getPhoneNumber(), occupantsForm.getInjuries(), occupantsForm.getSeatingPosition(), occupantsForm.getAtFaultInsuranceCompany(), occupantsForm.getVictimInsuranceCompany(), sequenceNo, 1);
				Occupants occupants = new Occupants(occupantsId, crashReports);
				occupantsDAO.save(occupants);
				sequenceNo++;
			}
			
			if(crashReportsForm.getIsChecker()){
				// Put Entry In Verification Log as Verified
				VerificationLogForm verificationLogForm = new VerificationLogForm(null, loginService.getCurrentAccountId(), "", crashReportsForm.getReportId(), crmProperties.getProperty("verificationSuccessNotes"), CRMConstants.convertUSAFormatWithTime(CRMConstants.getCurrentDateTime()), Integer.parseInt(crmProperties.getProperty("verifiedSuccessfully")), 1);
				verificationLogService.saveVerificationLog(verificationLogForm);
			}
			
			// Insert Runner Report In CRO only On Save
			if(Integer.parseInt(crmProperties.getProperty("sentToCRO"))==1&&crashReportsForm.getIsChecker()){
				CrashReportForm crashReportForm = new CrashReportForm(crashReportsForm.getReportNumber(), crashReportsForm.getCrashDate(), crashReportsForm.getCountyId().toString(), crashReportsForm.getFileName(), Integer.parseInt(crmProperties.getProperty("reportFrom")), patientForms);
				apiRequestService.saveRunnerReportInCRO(crashReportForm);
			}
						
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		//Logic Ends
		
		return 1;
	}
	
	//Save an Entry
	public int saveCrashReports(CrashReportsForm crashReportsForm) throws Exception
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		try {
			Accounts accounts = accountsDAO.getAccountsById(loginService.getCurrentAccountId());
			// County Data
			County county = countyDAO.get(crashReportsForm.getCountyId());
			CrashReports crashReports=new CrashReports(crashReportsForm.getReportId(), null, accounts, county, crashReportsForm.getReportNumber(),  CRMConstants.convertYearFormat(crashReportsForm.getCrashDate()), crashReportsForm.getLocation(), crashReportsForm.getCrashSeverity(), crashReportsForm.getOccupantsForms().size(), null,  new Date(), new Date(), Integer.parseInt(crmProperties.getProperty("newlyAddedReport")), 1, null,null);
			crashReports.setFileName(crashReportsForm.getFileName());
			crashReportsDAO.saveCrashReports(crashReports);
			Integer sequenceNo=1;
			for (OccupantsForm occupantsForm : crashReportsForm.getOccupantsForms()) {
				OccupantsId occupantsId = new OccupantsId(crashReports.getReportId(), occupantsForm.getFirstName(), occupantsForm.getLastName(), occupantsForm.getAddress(), occupantsForm.getPhoneNumber(), occupantsForm.getInjuries(), occupantsForm.getSeatingPosition(), occupantsForm.getAtFaultInsuranceCompany(), occupantsForm.getVictimInsuranceCompany(), sequenceNo, 1);
				Occupants occupants = new Occupants(occupantsId, crashReports);
				occupantsDAO.save(occupants);
				sequenceNo++;
			}
			
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//Logic Ends
		
		return 1;
	}
	
	public String uploadCrashReport(MultipartFile crashReport,String reportNumber, String reportId) throws Exception{
		
		String fileName="";
		if(reportId.equals("")){
			String uuid= UUID.randomUUID().toString().replaceAll("-", "");
			fileName= uuid+".pdf";
			reportId=uuid;
		}else{
			fileName= reportId+".pdf";
		}
		
		String filePath=crmProperties.getProperty("tempFolder")+fileName;
		try {
			// Write File Temp Folder
			File file=CRMConstants.saveTemporaryFile(crashReport, filePath);
			if(crmProperties.getProperty("awsUpload").equals("1")){
				// Upload File To AWS S3
				awsFileUpload.uploadFileToAWSS3(filePath, fileName);
				
				// File Delete in Temp Folder
				file.delete();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return reportId;
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
	public int deleteCrashReports(String reportId)
	{
		CrashReports crashReports = crashReportsDAO.getReportsByReportId(reportId);
		String fileName=crashReports.getFileName();
		// Delete File In AWS S3
		try {
			awsFileUpload.deleteFileFromAWSS3(fileName);
			// Delete In DB
			crashReportsDAO.deleteCrashReports(crashReports);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 1;
	}
	
	//Check Report Number Exist
	public Integer checkReportNumberIsExist(String reportId,String reportNumber,String crashDate, Integer countyId)
	{
		Integer isExist=null;
		if(reportId!=null&&!reportId.equals("")){
			isExist = crashReportsDAO.checkReportNumberExist(reportId, reportNumber, crashDate, countyId);
		}else{
			isExist = crashReportsDAO.checkReportNumberExist(reportNumber, crashDate, countyId);
		}
		
		
		return isExist;
	}
	
	// Check Report Number Exist Multiple
	public CrashReportsFormList checkReportNumberIsExistMultiple(CrashReportsFormList crashReportsFormList)
	{
		CrashReportsFormList crashReportsFormList2 = new CrashReportsFormList();
		List<CrashReportsForm> crashReportsForms = new ArrayList<CrashReportsForm>();
		for (CrashReportsForm crashReportsForm : crashReportsFormList.getCrashReportsForms()) {
			Integer isExist = crashReportsDAO.checkReportNumberExist(crashReportsForm.getReportNumber(), crashReportsForm.getCrashDate(), crashReportsForm.getCountyId());;
			if(isExist==1){
				crashReportsForm.setReportNumberExist(true);
			}else{
				crashReportsForm.setReportNumberExist(false);
			}
			
			if(crashReportsFormList.getPageType()==1){
				crashReportsForm.setFromPage(0);
				crashReportsForm.setToPage(0);
			}
			crashReportsForms.add(crashReportsForm);
		}
		
		crashReportsFormList2.setCrashReportsForms(crashReportsForms);
		crashReportsFormList2.setPageType(crashReportsFormList.getPageType());
		
		return crashReportsFormList2;
	}
	
	//Store Multi-Report File Temporary
	public String storeFileTemp(MultipartFile report) throws IOException{		
		String filePath=crmProperties.getProperty("tempFolder")+UUID.randomUUID().toString().replaceAll("-", "")+".pdf";
		CRMConstants.saveTemporaryFile(report, filePath);
		return filePath;
	}
	
	//Split Multi Report File into Multi Files
	public void splitFile(String inputFilePath,String outputFilePath,Integer fromPage,Integer toPage) throws DocumentException, IOException{
	
		OutputStream outputStream = new FileOutputStream(new File(crmProperties.getProperty("tempFolder")+outputFilePath));
	 	Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document, outputStream);
        document.open();
        PdfContentByte cb = writer.getDirectContent();
        PdfReader reader = new PdfReader(new FileInputStream(inputFilePath));
            for (int i = fromPage; i <= toPage; i++) {
                document.newPage();
                //import the page from source PDF
                PdfImportedPage page = writer.getImportedPage(reader, i);
                //add the page to the destination PDF
                cb.addTemplate(page, 0, 0);
            }
        outputStream.flush();
        document.close();
        outputStream.close();
	}	
		
	public Integer checkForNumberOfPages(String inputFilePath) throws IOException{
		PdfReader reader = new PdfReader(inputFilePath);
        return reader.getNumberOfPages();
    }
	
	public boolean checkPagesEntry(List<CrashReportsForm> crashReportsForms,Integer pdfTotalPages,Integer pageType){
		
		Integer totalCorrectReports=0;
		for (CrashReportsForm crashReportsForm : crashReportsForms) {
			if(pageType==2){
				if(crashReportsForm.getFromPage()<=pdfTotalPages){
					Integer totalPages=(crashReportsForm.getFromPage()+crashReportsForm.getToPage())-1;
					if(totalPages<=pdfTotalPages){
						totalCorrectReports++;
					}
				}
			}else{
				totalCorrectReports++;
			}
		}
		
		if(totalCorrectReports==crashReportsForms.size()){
			return true;
		}else{
			return false;
		}
	}
	
	public void deleteFile(String fileLocation){
		File file = new File(fileLocation);
		file.delete();
	}
	
	// Send Report To Verification
	public Integer sendToVerification(List<String> reportIds){
		
		// Get Verify Account Id
		CheckerUploaderMapping checkerUploaderMapping = checkerUploaderMappingDAO.getCheckerUploaderMappingByUploader(loginService.getCurrentAccountId());
		Accounts accounts = accountsDAO.getAccountsById(checkerUploaderMapping.getId().getCheckerAccountId());
		for (String reportId : reportIds) {
			CrashReports crashReports = crashReportsDAO.getReportsByReportId(reportId);
			crashReports.setAccountsByVerifyAccountId(accounts);
			crashReports.setVerifiedStatus(Integer.parseInt(crmProperties.getProperty("verificationPending")));
			crashReportsDAO.update(crashReports);
			
			// Verification Log
			VerificationLogForm verificationLogForm = new VerificationLogForm(null, loginService.getCurrentAccountId(), "", reportId, crmProperties.getProperty("verificationSendNotes"), CRMConstants.convertUSAFormatWithTime(CRMConstants.getCurrentDateTime()), Integer.parseInt(crmProperties.getProperty("verificationPending")), 1);
			verificationLogService.saveVerificationLog(verificationLogForm);
		}
			
		return 1;
	}

	public void rejectFromVerification(String reportId,String rejectNotes) {
		// TODO Auto-generated method stub
		CrashReports crashReports = crashReportsDAO.getReportsByReportId(reportId);
		crashReports.setVerifiedStatus(Integer.parseInt(crmProperties.getProperty("rejectedFromVerification")));
		crashReportsDAO.update(crashReports);
		
		// Verification Log
		VerificationLogForm verificationLogForm = new VerificationLogForm(null, loginService.getCurrentAccountId(), "", reportId, rejectNotes, CRMConstants.convertUSAFormatWithTime(CRMConstants.getCurrentDateTime()), Integer.parseInt(crmProperties.getProperty("rejectedFromVerification")), 1);
		verificationLogService.saveVerificationLog(verificationLogForm);
	}

	public Long getCountOfPendingCrashReports(
			CrashReportSearchForm crashReportSearchForm) {
		// TODO Auto-generated method stub
		CrashReportsSearchResultSet crashReportsSearchResultSet=crashReportsDAO.searchCrashReports(crashReportSearchForm);
		return crashReportsSearchResultSet.getTotalRecords();
	}
}

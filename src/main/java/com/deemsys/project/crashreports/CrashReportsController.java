
package com.deemsys.project.crashreports;


import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.deemsys.project.AWS.AWSFileUpload;
import com.deemsys.project.common.CRMProperties;
import com.deemsys.project.login.LoginService;
import com.itextpdf.text.DocumentException;

/**
 * 
 * @author Deemsys
 *
 */
@Controller
public class CrashReportsController {
	
	@Autowired
	CrashReportsService crashReportsService;
	
	@Autowired
	AWSFileUpload awsFileUpload;
	
	@Autowired
	CRMProperties crmProperties;

	@Autowired
	LoginService loginService;
	
    @RequestMapping(value="/getCrashReports",method=RequestMethod.GET)
	public String getCrashReports(@RequestParam("id") String id,ModelMap model)
	{
    	model.addAttribute("crashReportsForm",crashReportsService.getCrashReports(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/User/mergeCrashReports",method=RequestMethod.POST)
   	public String mergeCrashReports(@RequestBody CrashReportsForm crashReportsForm,ModelMap model)
   	{
    	crashReportsService.mergeCrashReports(crashReportsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/User/uploadCrashReports",method=RequestMethod.POST)
   	public String uploadCrashReports(@RequestParam("crashReport") MultipartFile crashReport, @RequestParam("reportNumber") String reportNumber,  @RequestParam("reportId") String reportId,ModelMap model)
   	{
    	try {
			String generatedReportId=crashReportsService.uploadCrashReport(crashReport, reportNumber, reportId);
			model.addAttribute("reportId",generatedReportId);
			model.addAttribute("requestSuccess", true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			model.addAttribute("error", e.toString());
			model.addAttribute("requestSuccess", false);
		}
		return "/returnPage";
   	}
    
    @RequestMapping(value="/User/saveUpdateCrashReports",method=RequestMethod.POST)
   	public String saveCrashReports(@RequestBody CrashReportsForm crashReportsForm, ModelMap model)
   	{
    	if(crashReportsForm.getReportId()==null)
			try {
				crashReportsService.saveCrashReports(crashReportsForm);
				model.addAttribute("requestSuccess",true);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				model.addAttribute("error",e.toString());
				model.addAttribute("requestSuccess",false);
			}
		else
    		crashReportsService.updateCrashReports(crashReportsForm);
    
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/User/deleteCrashReports",method=RequestMethod.POST)
   	public String deleteCrashReports(@RequestParam("id") String id,ModelMap model)
   	{
    	
    	crashReportsService.deleteCrashReports(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/User/searchCrashReports",method=RequestMethod.POST)
   	public String getAllCrashReportss(@RequestBody CrashReportSearchForm crashReportSearchForm,ModelMap model)
   	{
    	model.addAttribute("crashReportsResult",crashReportsService.searchCrashReportsList(crashReportSearchForm));
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
    @RequestMapping(value="/searchCrashReportsAllUser",method=RequestMethod.POST)
   	public String searchCrashReportsAllUser(@RequestBody CrashReportSearchForm crashReportSearchForm,ModelMap model)
   	{
    	model.addAttribute("crashReportsResult",crashReportsService.searchCrashReportsList(crashReportSearchForm));
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveIPAddressOfClientMachine",method=RequestMethod.POST)
   	public String saveIPAddressOfClientMachine(@RequestParam("reportId") String reportId,ModelMap model,HttpServletRequest request)
   	{
    	String ipAddress=request.getHeader("X-FORWARDED-FOR");
    	if(ipAddress==null){
    		ipAddress=request.getRemoteAddr();
    	}
    	System.out.println("IpAddress"+ipAddress);
    	System.out.println("host"+request.getRemoteHost());
    	model.addAttribute("IpAddress", ipAddress);
    	model.addAttribute("host", request.getRemoteHost());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
 
    // Check Report Number Already Exist
    @RequestMapping(value="/User/checkReportNumberExist",method=RequestMethod.GET)
	public String checkReportNumberAlreadyExist(@RequestParam("reportNumber") String reportNumber,@RequestParam("reportId") String reportId,@RequestParam("crashDate") String crashDate,@RequestParam("countyId") Integer countyId,ModelMap model)
	{
    	model.addAttribute("isExist",crashReportsService.checkReportNumberIsExist(reportId,reportNumber,crashDate,countyId));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
    
    @RequestMapping(value="/User/checkReportNumberExistMultipleReport",method=RequestMethod.POST)
   	public String checkReportNumberAlreadyExistMultiple(@RequestBody CrashReportsFormList crashReportsFormList,ModelMap model)
   	{
       	model.addAttribute("crashReportsList",crashReportsService.checkReportNumberIsExistMultiple(crashReportsFormList));
       	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/User/submitCrashReports",method=RequestMethod.POST)
   	public String uploadFileWithContent(@RequestPart("crashReport") MultipartFile crashReport, @RequestPart("crashReportFormList") CrashReportsFormList crashReportsFormList,ModelMap model) throws IOException, DocumentException
   	{
    	
    	
    	String multiReportFilePath="";
    	multiReportFilePath=crashReportsService.storeFileTemp(crashReport);
        String multiReportFileName=multiReportFilePath.substring(multiReportFilePath.lastIndexOf("/")+1);
    		
    		// Total Pages Pdf
    		Integer pdfTotalPages=crashReportsService.checkForNumberOfPages(multiReportFilePath);
    		
    		//Check The Total Page Validation
    		if(crashReportsService.checkPagesEntry(crashReportsFormList.getCrashReportsForms(), pdfTotalPages, crashReportsFormList.getPageType())){
    			//Page Validation Success
    			Integer reportSuccessCount=0;
    			for (CrashReportsForm crashReportsForm : crashReportsFormList.getCrashReportsForms()) {
    				
    				//Creating Split File
    				String reportId=UUID.randomUUID().toString().replaceAll("-", "");
    				crashReportsForm.setFileName(reportId+".pdf");
    				crashReportsForm.setReportId(reportId);
    				if(crashReportsFormList.getPageType()==2){
    					// Splitting File
    					crashReportsService.splitFile(multiReportFilePath,crashReportsForm.getFileName(), crashReportsForm.getFromPage(), (crashReportsForm.getFromPage()+crashReportsForm.getToPage())-1);
    					multiReportFileName=crashReportsForm.getFileName();
    				}
    				
    				//Upload to AWS
    				Integer status=awsFileUpload.uploadFileToAWSS3(crmProperties.getProperty("tempFolder")+multiReportFileName, crashReportsForm.getFileName());
    				if(crashReportsFormList.getPageType()==2){
    					if(status==0){
    						reportSuccessCount++;
    						// Delete Splitted Temp File
    						crashReportsService.deleteFile(crmProperties.getProperty("tempFolder")+crashReportsForm.getFileName());
    					}
    				}else{
    					if(status==0){
    						reportSuccessCount++;
    					}
    				}
    				
    				//Save Crash Report
    				try {
    					crashReportsService.saveCrashReports(crashReportsForm);
    					model.addAttribute("error",false);
		    			model.addAttribute("requestSuccess", true);
		    			model.addAttribute("errorDescription", "");
		    			model.addAttribute("errorCode",0);
		    		} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						model.addAttribute("error",true);
		    			model.addAttribute("requestSuccess", true);
		    			model.addAttribute("errorDescription", e.toString());
		    			model.addAttribute("errorCode",2);
					}
    				
				}
    			
    			if(crashReportsFormList.getCrashReportsForms().size()==reportSuccessCount){
    				// delete Main Temp File
    				crashReportsService.deleteFile(multiReportFilePath);
    			}
    		}else{
    			//Page Validation Got Failed
    			model.addAttribute("error",true);
    			model.addAttribute("requestSuccess", true);
    			model.addAttribute("errorDescription", "Please Check File Page Numbers");
    			model.addAttribute("errorCode",1);
    		}
    
		
		return "/returnPage";
   	}
    
    // Send Report To Verification
    @RequestMapping(value="/User/sendReportToVerification",method=RequestMethod.POST)
   	public String sendReportToVerification(@RequestParam("reportId") List<String> reportIds,ModelMap model)
   	{
    	crashReportsService.sendToVerification(reportIds);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    // Report failed the Verification, Reject the Report
    @RequestMapping(value="/User/rejectReportFromVerification",method=RequestMethod.POST)
   	public String rejectReportFromVerification(@RequestParam("reportId") String reportId,@RequestParam("rejectNotes") String rejectNotes,ModelMap model)
   	{
    	crashReportsService.rejectFromVerification(reportId,rejectNotes);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    // Get Count of Pending Reports
    @RequestMapping(value="/User/getPendingReportsCount",method=RequestMethod.GET)
   	public String getCountOfPendingCrashReportss(ModelMap model)
   	{
    	model.addAttribute("pendingReportsCount",crashReportsService.getCountOfPendingCrashReports());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
}

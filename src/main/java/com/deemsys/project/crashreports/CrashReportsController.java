
package com.deemsys.project.crashreports;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

/**
 * 
 * @author Deemsys
 *
 */
@Controller
public class CrashReportsController {
	
	@Autowired
	CrashReportsService crashReportsService;

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
   	public String uploadCrashReports(@RequestParam("crashReport") MultipartFile crashReport, @RequestParam("reportNumber") String reportNumber,ModelMap model)
   	{
    	try {
			String reportId=crashReportsService.uploadCrashReport(crashReport, reportNumber);
			model.addAttribute("reportId",reportId);
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
    
    @RequestMapping(value="/searchCrashReports",method=RequestMethod.POST)
   	public String getAllCrashReportss(@RequestBody CrashReportSearchForm crashReportSearchForm,ModelMap model)
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
    
}

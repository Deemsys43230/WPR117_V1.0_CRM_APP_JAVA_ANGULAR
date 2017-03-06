
package com.deemsys.project.crashreports;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 
 * @author Deemsys
 *
 */
@Controller
@RequestMapping("/User")
public class CrashReportsController {
	
	@Autowired
	CrashReportsService crashReportsService;

    @RequestMapping(value="/getCrashReports",method=RequestMethod.GET)
	public String getCrashReports(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("crashReportsForm",crashReportsService.getCrashReports(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeCrashReports",method=RequestMethod.POST)
   	public String mergeCrashReports(@ModelAttribute("crashReportsForm") CrashReportsForm crashReportsForm,ModelMap model)
   	{
    	crashReportsService.mergeCrashReports(crashReportsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateCrashReports",method=RequestMethod.POST)
   	public String saveCrashReports(@ModelAttribute("crashReportsForm") CrashReportsForm crashReportsForm,ModelMap model)
   	{
    	if(crashReportsForm.getReportId()==null)
    		crashReportsService.saveCrashReports(crashReportsForm);
    	else
    		crashReportsService.updateCrashReports(crashReportsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteCrashReports",method=RequestMethod.POST)
   	public String deleteCrashReports(@RequestParam("id") Integer id,ModelMap model)
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
	
}

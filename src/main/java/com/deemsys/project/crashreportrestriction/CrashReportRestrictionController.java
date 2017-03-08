
package com.deemsys.project.crashreportrestriction;


import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 
 * @author Deemsys
 *
 */
@Controller
public class CrashReportRestrictionController {
	
	@Autowired
	CrashReportRestrictionService crashReportRestrictionService;

    @RequestMapping(value="/getCrashReportRestriction",method=RequestMethod.GET)
	public String getCrashReportRestriction(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("crashReportRestrictionForm",crashReportRestrictionService.getCrashReportRestriction(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeCrashReportRestriction",method=RequestMethod.POST)
   	public String mergeCrashReportRestriction(ModelMap model,HttpServletRequest request)
   	{
    	String ipAddress=request.getHeader("X-FORWARDED-FOR");
       	if(ipAddress==null){
       		ipAddress=request.getRemoteAddr();
       	}
       	CrashReportRestrictionForm crashReportRestrictionForm = new CrashReportRestrictionForm(ipAddress, null, 1);
    	crashReportRestrictionService.mergeCrashReportRestriction(crashReportRestrictionForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateCrashReportRestriction",method=RequestMethod.POST)
   	public String saveCrashReportRestriction(@ModelAttribute("crashReportRestrictionForm") CrashReportRestrictionForm crashReportRestrictionForm,ModelMap model)
   	{
    	if(crashReportRestrictionForm.getClientIp().equals(""))
    		crashReportRestrictionService.saveCrashReportRestriction(crashReportRestrictionForm);
    	else
    		crashReportRestrictionService.updateCrashReportRestriction(crashReportRestrictionForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteCrashReportRestriction",method=RequestMethod.POST)
   	public String deleteCrashReportRestriction(@RequestParam("id") Integer id,ModelMap model)
   	{
    	
    	crashReportRestrictionService.deleteCrashReportRestriction(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getAllCrashReportRestrictions",method=RequestMethod.GET)
   	public String getAllCrashReportRestrictions(ModelMap model)
   	{
    	model.addAttribute("crashReportRestrictionForms",crashReportRestrictionService.getCrashReportRestrictionList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
    @RequestMapping(value="/getCrashReportRestrictionStatus",method=RequestMethod.GET)
   	public String getCrashReportRestrictionStatus(ModelMap model,HttpServletRequest request)
   	{
       	String ipAddress=request.getHeader("X-FORWARDED-FOR");
       	if(ipAddress==null){
       		ipAddress=request.getRemoteAddr();
       	}
       	System.out.println("IpAddress"+ipAddress);
       	model.addAttribute("isAccessable",crashReportRestrictionService.getCrashReportRestrictionStatus(ipAddress));
       	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   	
}

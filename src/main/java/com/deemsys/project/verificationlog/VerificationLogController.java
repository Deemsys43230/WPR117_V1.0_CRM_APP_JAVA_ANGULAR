
package com.deemsys.project.verificationlog;


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
@RequestMapping("/User")
public class VerificationLogController {
	
	@Autowired
	VerificationLogService verificationLogService;

    @RequestMapping(value="/getVerificationLog",method=RequestMethod.GET)
	public String getVerificationLog(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("verificationLogForm",verificationLogService.getVerificationLog(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeVerificationLog",method=RequestMethod.POST)
   	public String mergeVerificationLog(@ModelAttribute("verificationLogForm") VerificationLogForm verificationLogForm,ModelMap model)
   	{
    	verificationLogService.mergeVerificationLog(verificationLogForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateVerificationLog",method=RequestMethod.POST)
   	public String saveVerificationLog(@ModelAttribute("verificationLogForm") VerificationLogForm verificationLogForm,ModelMap model)
   	{
    	if(verificationLogForm.getVerificationLogId().equals(""))
    		verificationLogService.saveVerificationLog(verificationLogForm);
    	else
    		verificationLogService.updateVerificationLog(verificationLogForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteVerificationLog",method=RequestMethod.POST)
   	public String deleteVerificationLog(@RequestParam("id") Integer id,ModelMap model)
   	{
    	
    	verificationLogService.deleteVerificationLog(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getVerificationLogsByReport",method=RequestMethod.GET)
   	public String getVerificationLogsByReport(@RequestParam("reportId") String reportId,ModelMap model)
   	{
    	model.addAttribute("verificationLogForms",verificationLogService.getVerificationLogListByReport(reportId));
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
}

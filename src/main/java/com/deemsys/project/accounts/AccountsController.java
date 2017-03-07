
package com.deemsys.project.accounts;


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
@RequestMapping("/Admin")
public class AccountsController {
	
	@Autowired
	AccountsService accountsService;

    @RequestMapping(value="/getAccount",method=RequestMethod.GET)
	public String getAccounts(@RequestParam("id") String id,ModelMap model)
	{
    	model.addAttribute("accountsForm",accountsService.getAccounts(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeAccounts",method=RequestMethod.POST)
   	public String mergeAccounts(@RequestBody AccountsForm accountsForm,ModelMap model)
   	{
    	accountsService.mergeAccounts(accountsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateAccounts",method=RequestMethod.POST)
   	public String saveAccounts(@RequestBody AccountsForm accountsForm,ModelMap model)
   	{
    	if(accountsForm.getAccountId()==null)
    		accountsService.saveAccounts(accountsForm);
    	else
    		accountsService.updateAccounts(accountsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteAccount",method=RequestMethod.POST)
   	public String deleteAccounts(@RequestParam("id") String id,ModelMap model)
   	{
    	
    	accountsService.deleteAccounts(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getAllAccounts",method=RequestMethod.GET)
   	public String getAllAccountss(ModelMap model)
   	{
    	model.addAttribute("accountsForms",accountsService.getAccountsList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
    @RequestMapping(value="/enableOrDisableAccount",method=RequestMethod.POST)
   	public String enableOrDisableAccount(@RequestParam("id") String id,ModelMap model)
   	{
    	
    	accountsService.enableOrDisableAccount(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/resetAccount",method=RequestMethod.POST)
   	public String resetPassword(@RequestParam("id") String id,ModelMap model)
   	{
    	
    	accountsService.resetPassword(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
}

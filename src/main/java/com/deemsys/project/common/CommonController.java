
package com.deemsys.project.common;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.deemsys.project.login.LoginService;

/**
 * 
 * @author Deemsys
 *
 */


@Controller
public class CommonController {

	@Autowired
	LoginService loginService;
	
    @RequestMapping(value={"/upload"},method=RequestMethod.GET)
	public String getIndex(ModelMap model)
	{
    	model.addAttribute("Success",true);
		return "/index";
	}
    
    @RequestMapping(value="getCurrentRole",method=RequestMethod.GET)
    public String getCurrentRole(ModelMap model){
    	
    	try {
			model.addAttribute("role",loginService.getCurrentRole());
			model.addAttribute("requestSuccess", true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			model.addAttribute("requestSuccess", false);
		}
    	return "";
    }
    
    @RequestMapping(value="/home",method=RequestMethod.GET)
	public String getHomePage(ModelMap model)
	{
    	model.addAttribute("Success",true);
		return "/home";
	}
   	
    @RequestMapping(value={"/index","/"},method=RequestMethod.GET)
	public String getSearch(ModelMap model)
	{
    	model.addAttribute("Success",true);
		return "/search";
	}
    
    // Login Failed
 	@RequestMapping(value="/login-failed",method=RequestMethod.GET)
 	public String getLogin(ModelMap model)
 	{
     	model.addAttribute("failed",true);
 		return "/index";
 	}
 	
 	// Logout
 	@RequestMapping(value="/logout",method=RequestMethod.GET)
   	public String logout(ModelMap model)
   	{
       	model.addAttribute("Success",true);
   		return "/index";
   	}
}

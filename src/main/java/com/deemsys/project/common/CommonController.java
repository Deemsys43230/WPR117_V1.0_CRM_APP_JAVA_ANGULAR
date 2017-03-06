
package com.deemsys.project.common;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 
 * @author Deemsys
 *
 */


@Controller
public class CommonController {

    @RequestMapping(value={"/index","/"},method=RequestMethod.GET)
	public String getIndex(ModelMap model)
	{
    	model.addAttribute("Success",true);
		return "/index";
	}
	
    @RequestMapping(value={"/search"},method=RequestMethod.GET)
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
	
}

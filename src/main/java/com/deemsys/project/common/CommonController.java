
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
	
	
}

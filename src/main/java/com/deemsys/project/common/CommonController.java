
package com.deemsys.project.common;


import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
		return "/ohio-main";
	}
    
    @RequestMapping(value={"/upload/"},method=RequestMethod.GET)
	public void getIndex1(HttpServletResponse http,ModelMap model)
	{
    	try {
			http.sendRedirect("../upload");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
    
    @RequestMapping(value="getCurrentDate",method=RequestMethod.GET)
    public String getCurrentDate(ModelMap model){
    	
    	try {
			model.addAttribute("currentDate",CRMConstants.convertMonthFormat(new Date()));
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
    	model.addAttribute("departmentId",loginService.getCurrentAccountPoliceDepartmentId());
		return "/home";
	}
   	
    @RequestMapping(value={"/index","/"},method=RequestMethod.GET)
	public String getSearch(ModelMap model)
	{
    	model.addAttribute("Success",true);
		return "/search";
	}
    
    /*@RequestMapping(value={"/index","/"},method=RequestMethod.GET)
	public String getSearch(ModelMap model)
	{
    	model.addAttribute("Success",true);
		return "/index";
	}*/
    
    // Login Failed
 	@RequestMapping(value="/login-failed",method=RequestMethod.GET)
 	public void getLogin(HttpServletRequest request,HttpServletResponse response,ModelMap model)
 	{
     	model.addAttribute("failed",true);
     	String departmentId=(String) request.getSession().getAttribute("LAST_DEPARTMENT");
 		//model.addAttribute("departmentId",departmentId);
 		try{
	 		if(departmentId.equals("1")){
	 			response.sendRedirect("boardman?error=1");
			}else if(departmentId.equals("2")){
	 			response.sendRedirect("fairborn?error=1");
			}
 		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
 	}
 	
 	// Logout
 	@RequestMapping(value="/logout",method=RequestMethod.GET)
   	public String logout(HttpServletRequest request,ModelMap model)
   	{
       	model.addAttribute("Success",true);
        return "/ohio-main";
   	}
 	
 	 @RequestMapping(value={"/ohio"},method=RequestMethod.GET)
 	public String getIndexMain(ModelMap model)
 	{
     	model.addAttribute("Success",true);
 		return "/ohio-main";
 	}
 	 
    @RequestMapping(value={"/boardman"},method=RequestMethod.GET)
 	public String getBoardman(ModelMap model)
 	{
    	model.addAttribute("departmentId",1);
     	model.addAttribute("Success",true);
 		return "/index";
 	}
    
    @RequestMapping(value={"/fairborn"},method=RequestMethod.GET)
 	public String getFairborn(ModelMap model)
 	{
    	model.addAttribute("departmentId",2);
     	model.addAttribute("Success",true);
 		return "/index";
 	}
}

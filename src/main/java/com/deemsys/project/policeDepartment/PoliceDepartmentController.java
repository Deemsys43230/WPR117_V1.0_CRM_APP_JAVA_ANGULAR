
package com.deemsys.project.policeDepartment;


import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.deemsys.project.login.LoginService;

/**
 * 
 * @author Deemsys
 *
 */
@Controller
public class PoliceDepartmentController 
{
	
	@Autowired
	PoliceDepartmentService policeDepartmentService;

	@Autowired
	LoginService loginService;
	
    @RequestMapping(value="/getPoliceDepartment",method=RequestMethod.GET)
	public String getPoliceDepartment(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("policeDepartmentForm",policeDepartmentService.getPoliceDepartment(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
    
  
    @RequestMapping(value="/mergePoliceDepartment",method=RequestMethod.POST)
   	public String mergePoliceDepartment(@RequestBody PoliceDepartmentForm policeDepartmentForm,ModelMap model)
   	{
    	model.addAttribute("policeDepartmentId",policeDepartmentService.mergePoliceDepartment(policeDepartmentForm));
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdatePoliceDepartment",method=RequestMethod.POST)
   	public String savePoliceDepartment(@RequestBody PoliceDepartmentForm policeDepartmentForm,ModelMap model)
   	{
           model.addAttribute("policeDepartmentId",policeDepartmentService.savePoliceDepartment(policeDepartmentForm));
           model.addAttribute("requestSuccess",true);
            return "/returnPage";
   	}
   
    
    
    
    @RequestMapping(value="/uploadPoliceDepartment",method=RequestMethod.POST)
   	public String uploadPoliceDepartment(@RequestParam("policeDepartmentFile") MultipartFile policeDepartmentFile,@RequestParam("policeDepartmentId") Integer policeDepartmentId,ModelMap model)
   	{
    	policeDepartmentService.uploadPoliceDepartment(policeDepartmentFile,policeDepartmentId);
    	
    	model.addAttribute("policeDepartmentId",policeDepartmentId);
    	
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
  
    
    @RequestMapping(value="/uploadPoliceDepartmentWithoutFile",method=RequestMethod.POST)
   	public String uploadPoliceDepartmentWithoutFile(@RequestParam("policeDepartmentId") Integer policeDepartmentId,ModelMap model) throws IOException
   	{
    	policeDepartmentService.uploadPoliceDepartmentWithoutFile(policeDepartmentId);
    	
    	model.addAttribute("policeDepartmentId",policeDepartmentId);
    	
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
   
    @RequestMapping(value="/deletePoliceDepartment",method=RequestMethod.POST)
   	public String deletePoliceDepartment(@RequestParam("id") Integer id,ModelMap model)
   	{
        policeDepartmentService.deletePoliceDepartment(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    
    
    @RequestMapping(value="/enableOrDisableDepartment",method=RequestMethod.POST)
   	public String enableOrDisable(@RequestParam("id") Integer id,ModelMap model)
   	{
        policeDepartmentService.enableOrDisableDepartment(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    
    
    
    @RequestMapping(value="/getAllPoliceDepartments",method=RequestMethod.GET)
   	public String getAllPoliceDepartments(ModelMap model)
   	{
    	model.addAttribute("policeDepartmentForms",policeDepartmentService.getPoliceDepartmentList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
    @RequestMapping(value="/getActivePoliceDepartments",method=RequestMethod.GET)
   	public String getActivePoliceDepartments(ModelMap model)
   	{
    	model.addAttribute("policeDepartmentForms",policeDepartmentService.getActivePoliceDepartmentList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getCurrentUserPoliceDepartment",method=RequestMethod.GET)
   	public String getCurrentUserPoliceDepartment(ModelMap model)
   	{
       	model.addAttribute("policeDepartmentForm",policeDepartmentService.getPoliceDepartment(loginService.getCurrentAccountPoliceDepartmentId()));
       	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    
    
   
    @RequestMapping(value="/checkDepartmentName",method=RequestMethod.POST)
	public String checkDepartmentName(@RequestParam("name") String name,@RequestParam("id") Integer policeDepartmentId,ModelMap model)
	{
		model.addAttribute("isCorrect",policeDepartmentService.checkDepartmentName(name,policeDepartmentId));
		return "/returnPage";
	}

    
    @RequestMapping(value="/checkDepartmentCode",method=RequestMethod.POST)
	public String checkDepartmentCode(@RequestParam("code") String code,@RequestParam("id") Integer policeDepartmentId,ModelMap model)
	{
		model.addAttribute("isCorrect",policeDepartmentService.checkDepartmentCode(code,policeDepartmentId));
		return "/returnPage";
	}
    
    
    
    
    
    @RequestMapping(value="/checkDepartmentLogin",method=RequestMethod.POST)
	public String checkDepartmentLogin(@RequestParam("login") String login,@RequestParam("id") Integer policeDepartmentId,ModelMap model)
	{
		model.addAttribute("isCorrect",policeDepartmentService.checkDepartmentLogin(login,policeDepartmentId));
		return "/returnPage";
	}
    
    
    @RequestMapping(value="/checkDepartmentSearch",method=RequestMethod.POST)
	public String checkDepartmentSearch(@RequestParam("search") String search,@RequestParam("id") Integer policeDepartmentId,ModelMap model)
	{
		model.addAttribute("isCorrect",policeDepartmentService.checkDepartmentSearch(search,policeDepartmentId));
		return "/returnPage";
	}
    
    
    
    
}


package com.deemsys.project.policeDepartment;


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
public class PoliceDepartmentController {
	
	@Autowired
	PoliceDepartmentService policeDepartmentService;

    @RequestMapping(value="/getPoliceDepartment",method=RequestMethod.GET)
	public String getPoliceDepartment(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("policeDepartmentForm",policeDepartmentService.getPoliceDepartment(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergePoliceDepartment",method=RequestMethod.POST)
   	public String mergePoliceDepartment(@ModelAttribute("policeDepartmentForm") PoliceDepartmentForm policeDepartmentForm,ModelMap model)
   	{
    	policeDepartmentService.mergePoliceDepartment(policeDepartmentForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdatePoliceDepartment",method=RequestMethod.POST)
   	public String savePoliceDepartment(@ModelAttribute("policeDepartmentForm") PoliceDepartmentForm policeDepartmentForm,ModelMap model)
   	{
    	if(policeDepartmentForm.getPoliceDepartmentId().equals(""))
    		policeDepartmentService.savePoliceDepartment(policeDepartmentForm);
    	else
    		policeDepartmentService.updatePoliceDepartment(policeDepartmentForm);
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
    
    @RequestMapping(value="/getAllPoliceDepartments",method=RequestMethod.GET)
   	public String getAllPoliceDepartments(ModelMap model)
   	{
    	model.addAttribute("policeDepartmentForms",policeDepartmentService.getPoliceDepartmentList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
}

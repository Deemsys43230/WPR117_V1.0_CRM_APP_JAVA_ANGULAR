
package com.deemsys.project.county;


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
public class CountyController {
	
	@Autowired
	CountyService countyService;

    @RequestMapping(value="/getCounty",method=RequestMethod.GET)
	public String getCounty(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("countyForm",countyService.getCounty(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeCounty",method=RequestMethod.POST)
   	public String mergeCounty(@ModelAttribute("countyForm") CountyForm countyForm,ModelMap model)
   	{
    	countyService.mergeCounty(countyForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateCounty",method=RequestMethod.POST)
   	public String saveCounty(@ModelAttribute("countyForm") CountyForm countyForm,ModelMap model)
   	{
    	if(countyForm.getCountyId()==null)
    		countyService.saveCounty(countyForm);
    	else
    		countyService.updateCounty(countyForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteCounty",method=RequestMethod.POST)
   	public String deleteCounty(@RequestParam("id") Integer id,ModelMap model)
   	{
    	
    	countyService.deleteCounty(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/User/getAllCountys",method=RequestMethod.GET)
   	public String getAllCountys(ModelMap model)
   	{
    	model.addAttribute("countyForms",countyService.getCountyList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
}

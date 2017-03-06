
package com.deemsys.project.occupants;


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
public class OccupantsController {
	
	@Autowired
	OccupantsService occupantsService;

    @RequestMapping(value="/getOccupants",method=RequestMethod.GET)
	public String getOccupants(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("occupantsForm",occupantsService.getOccupants(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeOccupants",method=RequestMethod.POST)
   	public String mergeOccupants(@ModelAttribute("occupantsForm") OccupantsForm occupantsForm,ModelMap model)
   	{
    	occupantsService.mergeOccupants(occupantsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateOccupants",method=RequestMethod.POST)
   	public String saveOccupants(@ModelAttribute("occupantsForm") OccupantsForm occupantsForm,ModelMap model)
   	{
    	occupantsService.saveOccupants(occupantsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteOccupants",method=RequestMethod.POST)
   	public String deleteOccupants(@RequestParam("id") Integer id,ModelMap model)
   	{
    	
    	occupantsService.deleteOccupants(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getAllOccupantss",method=RequestMethod.GET)
   	public String getAllOccupantss(ModelMap model)
   	{
    	model.addAttribute("occupantsForms",occupantsService.getOccupantsList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
}

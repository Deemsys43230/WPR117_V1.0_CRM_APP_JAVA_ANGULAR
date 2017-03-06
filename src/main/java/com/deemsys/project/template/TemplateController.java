
package com.deemsys.project.template;


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
public class TemplateController {
	
	@Autowired
	TemplateService templateService;

    @RequestMapping(value="/getTemplate",method=RequestMethod.GET)
	public String getTemplate(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("templateForm",templateService.getTemplate(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeTemplate",method=RequestMethod.POST)
   	public String mergeTemplate(@ModelAttribute("templateForm") TemplateForm templateForm,ModelMap model)
   	{
    	templateService.mergeTemplate(templateForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateTemplate",method=RequestMethod.POST)
   	public String saveTemplate(@ModelAttribute("templateForm") TemplateForm templateForm,ModelMap model)
   	{
    	if(templateForm.getBlogId().equals(""))
    		templateService.saveTemplate(templateForm);
    	else
    		templateService.updateTemplate(templateForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteTemplate",method=RequestMethod.POST)
   	public String deleteTemplate(@RequestParam("id") Integer id,ModelMap model)
   	{
    	
    	templateService.deleteTemplate(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getAllTemplates",method=RequestMethod.GET)
   	public String getAllTemplates(ModelMap model)
   	{
    	model.addAttribute("templateForms",templateService.getTemplateList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
}

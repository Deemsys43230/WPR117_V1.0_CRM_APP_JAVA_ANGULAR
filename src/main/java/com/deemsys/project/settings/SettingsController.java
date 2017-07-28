
package com.deemsys.project.settings;


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
public class SettingsController {
	
	@Autowired
	SettingsService settingsService;

    @RequestMapping(value="/getSettings",method=RequestMethod.GET)
	public String getSettings(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("settingsForm",settingsService.getSettings(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeSettings",method=RequestMethod.POST)
   	public String mergeSettings(@ModelAttribute("settingsForm") SettingsForm settingsForm,ModelMap model)
   	{
    	settingsService.mergeSettings(settingsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateSettings",method=RequestMethod.POST)
   	public String saveSettings(@RequestBody SettingsForm settingsForm,ModelMap model)
   	{
    	if(settingsForm.getSettingId() == null)
    		settingsService.saveSettings(settingsForm);
    	else
    		settingsService.updateSettings(settingsForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteSettings",method=RequestMethod.POST)
   	public String deleteSettings(@RequestParam("id") Integer id,ModelMap model)
   	{
    	
    	settingsService.deleteSettings(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getAllSettingss",method=RequestMethod.GET)
   	public String getAllSettingss(ModelMap model)
   	{
    	model.addAttribute("settingsForms",settingsService.getSettingsList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
}

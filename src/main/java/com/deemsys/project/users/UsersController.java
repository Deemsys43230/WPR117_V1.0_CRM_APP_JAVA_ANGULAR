
package com.deemsys.project.users;


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
@RequestMapping("/Admin")
public class UsersController {
	
	@Autowired
	UsersService usersService;

    @RequestMapping(value="/getUser",method=RequestMethod.GET)
	public String getUsers(@RequestParam("id") Integer id,ModelMap model)
	{
    	model.addAttribute("usersForm",usersService.getUsers(id));
    	model.addAttribute("requestSuccess",true);
		return "/returnPage";
	}
	
    
    @RequestMapping(value="/mergeUsers",method=RequestMethod.POST)
   	public String mergeUsers(@RequestBody UsersForm usersForm,ModelMap model)
   	{
    	usersService.mergeUsers(usersForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/saveUpdateUsers",method=RequestMethod.POST)
   	public String saveUsers(@RequestBody UsersForm usersForm,ModelMap model)
   	{
    	if(usersForm.getUserId()==null)
    		usersService.saveUsers(usersForm);
    	else
    		usersService.updateUsers(usersForm);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
   
    
    @RequestMapping(value="/deleteUsers",method=RequestMethod.POST)
   	public String deleteUsers(@RequestParam("id") Integer id,ModelMap model)
   	{
    	
    	usersService.deleteUsers(id);
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
    
    @RequestMapping(value="/getAllUsers",method=RequestMethod.GET)
   	public String getAllUserss(ModelMap model)
   	{
    	model.addAttribute("usersForms",usersService.getUsersList());
    	model.addAttribute("requestSuccess",true);
   		return "/returnPage";
   	}
	
}

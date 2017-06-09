
package com.deemsys.project.accounts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.deemsys.project.login.LoginService;
import com.deemsys.project.users.UsersService;

/**
 * 
 * @author Deemsys
 *
 */
@Controller
public class AccountsController {

	@Autowired
	AccountsService accountsService;

	@Autowired
	LoginService loginService;
	
	@Autowired
	UsersService UsersService;

	@RequestMapping(value = "/SAdmin/getAccount", method = RequestMethod.GET)
	public String getAccounts(@RequestParam("id") String id, ModelMap model) {
		model.addAttribute("accountsForm", accountsService.getAccounts(id));
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/SAdmin/mergeAccounts", method = RequestMethod.POST)
	public String mergeAccounts(@RequestBody AccountsForm accountsForm, ModelMap model) {
		accountsService.mergeAccounts(accountsForm);
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/SAdmin/saveUpdateAccounts", method = RequestMethod.POST)
	public String saveAccounts(@RequestBody AccountsForm accountsForm, ModelMap model) {
		if (accountsForm.getAccountId() == null)
			accountsService.saveAccounts(accountsForm);
		else
			accountsService.updateAccounts(accountsForm);
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/SAdmin/deleteAccount", method = RequestMethod.POST)
	public String deleteAccounts(@RequestParam("id") String id, ModelMap model) {

		accountsService.deleteAccounts(id);
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/SAdmin/getAllAccounts", method = RequestMethod.GET)
	public String getAllAccountss(ModelMap model) {
		model.addAttribute("accountsForms", accountsService.getAccountsList());
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/SAdmin/enableOrDisableAccount", method = RequestMethod.POST)
	public String enableOrDisableAccount(@RequestParam("id") String id, ModelMap model) {

		accountsService.enableOrDisableAccount(id);
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/SAdmin/resetPassword", method = RequestMethod.POST)
	public String resetPassword(@RequestParam("id") String id, ModelMap model) {

		accountsService.resetPassword(id);
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/User/checkPassword", method = RequestMethod.POST)
	public String checkPassword(@RequestParam("password") String currentPassword, ModelMap model) {

		model.addAttribute("isCorrect",
				accountsService.checkPassword(loginService.getCurrentAccountId(), currentPassword));
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

	@RequestMapping(value = "/User/changePassword", method = RequestMethod.POST)
	public String changePassword(@RequestParam("password") String password, ModelMap model) {

		accountsService.changePassword(loginService.getCurrentAccountId(), password);
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}
	
	@RequestMapping(value="/User/checkUserNameExists",method=RequestMethod.POST)
	public String checkUserNameExists(@RequestParam("username") String username,@RequestParam("id") String accountId ,ModelMap model)
	{
		model.addAttribute("isCorrect",UsersService.checkUserNameExists(username, accountId));
		return "/returnPage";
	}

	@RequestMapping(value = "/SAdmin/getRolesList", method = RequestMethod.GET)
	public String getRolesList(ModelMap model) {
		model.addAttribute("rolesForm", accountsService.getRolesList());
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}
	@RequestMapping(value = "/SAdmin/getTotalRecords", method = RequestMethod.GET)
	public String getTotalRecords(ModelMap model) {
		model.addAttribute("recordsForm", accountsService.getTotalRecords());
		model.addAttribute("requestSuccess", true);
		return "/returnPage";
	}

}

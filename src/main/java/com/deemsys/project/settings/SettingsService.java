package com.deemsys.project.settings;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.accounts.AccountsForm;
import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.Settings;
/**
 * 
 * @author Deemsys
 *
 * Settings 	 - Entity
 * settings 	 - Entity Object
 * settingss 	 - Entity List
 * settingsDAO   - Entity DAO
 * settingsForms - EntityForm List
 * SettingsForm  - EntityForm
 *
 */
@Service
@Transactional
public class SettingsService {

	@Autowired
	SettingsDAO settingsDAO;
	
	//Get All Entries
	public List<SettingsForm> getSettingsList()
	{
		List<SettingsForm> settingsForms=new ArrayList<SettingsForm>();
		
		List<Settings> settingss=new ArrayList<Settings>();
		
		settingss=settingsDAO.getAll();
		
		for (Settings settings : settingss) 
		{
			SettingsForm settingsForm=new SettingsForm(settings.getSettingId(),settings.getSettingKey(),settings.getSettingValue());
			settingsForms.add(settingsForm);
	
			
		}
		
		return settingsForms;
	}
	
	//Get Particular Entry
	public SettingsForm getSettings(Integer settingId)
	{
		Settings settings=new Settings();
		
		settings=settingsDAO.getSettingsById(settingId);
		
		
		
		SettingsForm settingsForm=new SettingsForm(settings.getSettingId(),settings.getSettingKey(),settings.getSettingValue());
		
		
		
		return settingsForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeSettings(SettingsForm settingsForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		Settings settings=new Settings(settingsForm.getSettingKey(),settingsForm.getSettingValue());
		settingsDAO.merge(settings);
		return 1;
	}
	
	//Save an Entry
	public int saveSettings(SettingsForm settingsForm)
	{
		
		Settings settings=new Settings(settingsForm.getSettingKey(),settingsForm.getSettingValue());

		settingsDAO.save(settings);
		
return 1;
	}
	
	//Update an Entry
	public int updateSettings(SettingsForm settingsForm)
	{
		
		
		Settings settings=new Settings(settingsForm.getSettingKey(),settingsForm.getSettingValue());
		
		settings.setSettingId(settingsForm.getSettingId());
		
		
		settingsDAO.update(settings);
		
		return 1;
	}
	
	//Delete an Entry
	public int deleteSettings(Integer settingId)
	{
		Settings settings=settingsDAO.getSettingsById(settingId);
		
		settingsDAO.delete(settingId);
		
		return 1;
	}
	
	
	
}

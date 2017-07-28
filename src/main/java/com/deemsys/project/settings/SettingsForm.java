package com.deemsys.project.settings;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Deemsys
 *
 */
public class SettingsForm {

	private Integer settingId;
	private String settingKey;
	private String settingValue;
	
	
	public Integer getSettingId() {
		return settingId;
	}
	public void setSettingId(Integer settingId) {
		this.settingId = settingId;
	}
	public String getSettingKey() {
		return settingKey;
	}
	public void setSettingKey(String settingKey) {
		this.settingKey = settingKey;
	}
	public String getSettingValue() {
		return settingValue;
	}
	public void setSettingValue(String settingValue) {
		this.settingValue = settingValue;
	}
	public SettingsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SettingsForm(Integer settingId, String settingKey, String settingValue) {
		super();
		this.settingId = settingId;
		this.settingKey = settingKey;
		this.settingValue = settingValue;
	}
	
	
	









}


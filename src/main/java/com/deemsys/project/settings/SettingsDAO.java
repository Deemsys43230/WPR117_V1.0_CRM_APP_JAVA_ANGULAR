package com.deemsys.project.settings;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.PoliceDepartment;
import com.deemsys.project.entity.Settings;
/**
 * 
 * @author Deemsys
 *
 */
public interface SettingsDAO extends IGenericDAO<Settings>
{
public Settings getSettingsById(Integer settingId);

public Integer checkKeyValue(String settingKey, Integer settingId);

}

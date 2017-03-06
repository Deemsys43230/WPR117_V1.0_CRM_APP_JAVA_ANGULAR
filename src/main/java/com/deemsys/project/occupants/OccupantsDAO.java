package com.deemsys.project.occupants;

import java.util.List;

import com.deemsys.project.common.IGenericDAO;
import com.deemsys.project.entity.Occupants;
/**
 * 
 * @author Deemsys
 *
 */
public interface OccupantsDAO extends IGenericDAO<Occupants>{
	public List<Occupants> getOccupantsByReportId(String reportId);
}

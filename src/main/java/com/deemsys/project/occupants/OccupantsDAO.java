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
	public void deleteOccupantsByReportId(String reportId);
	public List<Occupants> getOccupantsByReportId(String reportId);
	public Long getCountOfOccupants();
}

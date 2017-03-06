package com.deemsys.project.occupants;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.entity.Occupants;
/**
 * 
 * @author Deemsys
 *
 * Occupants 	 - Entity
 * occupants 	 - Entity Object
 * occupantss 	 - Entity List
 * occupantsDAO   - Entity DAO
 * occupantsForms - EntityForm List
 * OccupantsForm  - EntityForm
 *
 */
@Service
@Transactional
public class OccupantsService {

	@Autowired
	OccupantsDAO occupantsDAO;
	
	//Get All Entries
	public List<OccupantsForm> getOccupantsList()
	{
		List<OccupantsForm> occupantsForms=new ArrayList<OccupantsForm>();
		
		List<Occupants> occupantss=new ArrayList<Occupants>();
		
		occupantss=occupantsDAO.getAll();
		
		for (Occupants occupants : occupantss) {
			//TODO: Fill the List
			
		}
		
		return occupantsForms;
	}
	
	//Get Particular Entry
	public OccupantsForm getOccupants(Integer getId)
	{
		Occupants occupants=new Occupants();
		
		occupants=occupantsDAO.get(getId);
		
		//TODO: Convert Entity to Form
		//Start
		
		OccupantsForm occupantsForm=new OccupantsForm();
		
		//End
		
		return occupantsForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeOccupants(OccupantsForm occupantsForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		Occupants occupants=new Occupants();
		
		//Logic Ends
		
		
		occupantsDAO.merge(occupants);
		return 1;
	}
	
	//Save an Entry
	public int saveOccupants(OccupantsForm occupantsForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		Occupants occupants=new Occupants();
		
		//Logic Ends
		
		occupantsDAO.save(occupants);
		return 1;
	}
	
	//Update an Entry
	public int updateOccupants(OccupantsForm occupantsForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		Occupants occupants=new Occupants();
		
		//Logic Ends
		
		occupantsDAO.update(occupants);
		return 1;
	}
	
	//Delete an Entry
	public int deleteOccupants(Integer id)
	{
		occupantsDAO.delete(id);
		return 1;
	}
	
	
	
}

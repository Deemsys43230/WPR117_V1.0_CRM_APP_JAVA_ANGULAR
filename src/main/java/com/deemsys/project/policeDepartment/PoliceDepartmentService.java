package com.deemsys.project.policeDepartment;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.common.CRMConstants;
import com.deemsys.project.entity.PoliceDepartment;
/**
 * 
 * @author Deemsys
 *
 * PoliceDepartment 	 - Entity
 * policeDepartment 	 - Entity Object
 * policeDepartments 	 - Entity List
 * policeDepartmentDAO   - Entity DAO
 * policeDepartmentForms - EntityForm List
 * PoliceDepartmentForm  - EntityForm
 *
 */
@Service
@Transactional
public class PoliceDepartmentService {

	@Autowired
	PoliceDepartmentDAO policeDepartmentDAO;
	
	//Get All Entries
	public List<PoliceDepartmentForm> getPoliceDepartmentList()
	{
		List<PoliceDepartmentForm> policeDepartmentForms=new ArrayList<PoliceDepartmentForm>();
		
		List<PoliceDepartment> policeDepartments=new ArrayList<PoliceDepartment>();
		
		policeDepartments=policeDepartmentDAO.getAll();
		
		for (PoliceDepartment policeDepartment : policeDepartments) {
			//TODO: Fill the List
			PoliceDepartmentForm policeDepartmentForm=new PoliceDepartmentForm(policeDepartment.getPoliceDepartmentId(), policeDepartment.getName(), policeDepartment.getCode(), CRMConstants.convertUSAFormatWithTime(policeDepartment.getCreatedDateTime()), policeDepartment.getStatus());
			policeDepartmentForms.add(policeDepartmentForm);
		}
		
		return policeDepartmentForms;
	}
	
	//Get Particular Entry
	public PoliceDepartmentForm getPoliceDepartment(Integer getId)
	{
		PoliceDepartment policeDepartment=policeDepartmentDAO.get(getId);
		
		//TODO: Convert Entity to Form
		//Start
		
		PoliceDepartmentForm policeDepartmentForm=new PoliceDepartmentForm(policeDepartment.getPoliceDepartmentId(), policeDepartment.getName(), policeDepartment.getCode(), CRMConstants.convertUSAFormatWithTime(policeDepartment.getCreatedDateTime()), policeDepartment.getStatus());
		
		//End
		
		return policeDepartmentForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergePoliceDepartment(PoliceDepartmentForm policeDepartmentForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		PoliceDepartment policeDepartment=new PoliceDepartment(policeDepartmentForm.getName(), policeDepartmentForm.getCode(), CRMConstants.convertYearFormatWithTime(policeDepartmentForm.getCreatedDateTime()), policeDepartmentForm.getStatus(), null, null);
		policeDepartment.setPoliceDepartmentId(policeDepartmentForm.getPoliceDepartmentId());
		//Logic Ends
		
		
		policeDepartmentDAO.merge(policeDepartment);
		return 1;
	}
	
	//Save an Entry
	public int savePoliceDepartment(PoliceDepartmentForm policeDepartmentForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		PoliceDepartment policeDepartment=new PoliceDepartment(policeDepartmentForm.getName(), policeDepartmentForm.getCode(), CRMConstants.convertYearFormatWithTime(policeDepartmentForm.getCreatedDateTime()), policeDepartmentForm.getStatus(), null, null);
		
		//Logic Ends
		
		policeDepartmentDAO.save(policeDepartment);
		return 1;
	}
	
	//Update an Entry
	public int updatePoliceDepartment(PoliceDepartmentForm policeDepartmentForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		PoliceDepartment policeDepartment=new PoliceDepartment(policeDepartmentForm.getName(), policeDepartmentForm.getCode(), CRMConstants.convertYearFormatWithTime(policeDepartmentForm.getCreatedDateTime()), policeDepartmentForm.getStatus(), null, null);
		policeDepartment.setPoliceDepartmentId(policeDepartmentForm.getPoliceDepartmentId());
		
		//Logic Ends
		
		policeDepartmentDAO.update(policeDepartment);
		return 1;
	}
	
	//Delete an Entry
	public int deletePoliceDepartment(Integer id)
	{
		policeDepartmentDAO.delete(id);
		return 1;
	}
	
	
	
}

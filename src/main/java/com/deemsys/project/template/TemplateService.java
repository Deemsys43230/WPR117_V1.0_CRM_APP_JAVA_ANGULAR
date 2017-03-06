package com.deemsys.project.template;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deemsys.project.entity.Template;
/**
 * 
 * @author Deemsys
 *
 * Template 	 - Entity
 * template 	 - Entity Object
 * templates 	 - Entity List
 * templateDAO   - Entity DAO
 * templateForms - EntityForm List
 * TemplateForm  - EntityForm
 *
 */
@Service
@Transactional
public class TemplateService {

	@Autowired
	TemplateDAO templateDAO;
	
	//Get All Entries
	public List<TemplateForm> getTemplateList()
	{
		List<TemplateForm> templateForms=new ArrayList<TemplateForm>();
		
		List<Template> templates=new ArrayList<Template>();
		
		templates=templateDAO.getAll();
		
		for (Template template : templates) {
			//TODO: Fill the List
			
		}
		
		return templateForms;
	}
	
	//Get Particular Entry
	public TemplateForm getTemplate(Integer getId)
	{
		Template template=new Template();
		
		template=templateDAO.get(getId);
		
		//TODO: Convert Entity to Form
		//Start
		
		TemplateForm templateForm=new TemplateForm();
		
		//End
		
		return templateForm;
	}
	
	//Merge an Entry (Save or Update)
	public int mergeTemplate(TemplateForm templateForm)
	{
		//TODO: Convert Form to Entity Here
		
		//Logic Starts
		
		Template template=new Template();
		
		//Logic Ends
		
		
		templateDAO.merge(template);
		return 1;
	}
	
	//Save an Entry
	public int saveTemplate(TemplateForm templateForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		Template template=new Template();
		
		//Logic Ends
		
		templateDAO.save(template);
		return 1;
	}
	
	//Update an Entry
	public int updateTemplate(TemplateForm templateForm)
	{
		//TODO: Convert Form to Entity Here	
		
		//Logic Starts
		
		Template template=new Template();
		
		//Logic Ends
		
		templateDAO.update(template);
		return 1;
	}
	
	//Delete an Entry
	public int deleteTemplate(Integer id)
	{
		templateDAO.delete(id);
		return 1;
	}
	
	
	
}

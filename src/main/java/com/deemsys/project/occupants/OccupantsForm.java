package com.deemsys.project.occupants;

import java.util.Date;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Deemsys
 *
 */
public class OccupantsForm {

	private String firstName;
	private String lastName;
	private String injuries;
	private String injuriesText;
	private String seatingPosition;
	private String seatingPositionText;
	private Integer status;
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getInjuries() {
		return injuries;
	}

	public void setInjuries(String injuries) {
		this.injuries = injuries;
	}

	public String getInjuriesText() {
		return injuriesText;
	}

	public void setInjuriesText(String injuriesText) {
		this.injuriesText = injuriesText;
	}

	public String getSeatingPosition() {
		return seatingPosition;
	}

	public void setSeatingPosition(String seatingPosition) {
		this.seatingPosition = seatingPosition;
	}

	public String getSeatingPositionText() {
		return seatingPositionText;
	}

	public void setSeatingPositionText(String seatingPositionText) {
		this.seatingPositionText = seatingPositionText;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public OccupantsForm(String firstName, String lastName, String injuries, String injuriesText,
			String seatingPosition, String seatingPositionText, Integer status) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.injuries = injuries;
		this.injuriesText = injuriesText;
		this.seatingPosition = seatingPosition;
		this.seatingPositionText = seatingPositionText;
		this.status = status;
	}

	public OccupantsForm() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

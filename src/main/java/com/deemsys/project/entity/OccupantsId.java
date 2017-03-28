package com.deemsys.project.entity;

// Generated 28 Mar, 2017 12:04:43 PM by Hibernate Tools 3.4.0.CR1

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * OccupantsId generated by hbm2java
 */
@Embeddable
public class OccupantsId implements java.io.Serializable {

	private String reportId;
	private String firstName;
	private String lastName;
	private String address;
	private String phoneNumber;
	private String injuries;
	private String seatingPosition;
	private String atFaultInsuranceCompany;
	private String victimInsuranceCompany;
	private Integer sequenceNo;
	private Integer status;

	public OccupantsId() {
	}

	public OccupantsId(String reportId) {
		this.reportId = reportId;
	}

	public OccupantsId(String reportId, String firstName, String lastName,
			String address, String phoneNumber, String injuries,
			String seatingPosition, String atFaultInsuranceCompany,
			String victimInsuranceCompany, Integer sequenceNo, Integer status) {
		this.reportId = reportId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.injuries = injuries;
		this.seatingPosition = seatingPosition;
		this.atFaultInsuranceCompany = atFaultInsuranceCompany;
		this.victimInsuranceCompany = victimInsuranceCompany;
		this.sequenceNo = sequenceNo;
		this.status = status;
	}

	@Column(name = "report_id", nullable = false, length = 32)
	public String getReportId() {
		return this.reportId;
	}

	public void setReportId(String reportId) {
		this.reportId = reportId;
	}

	@Column(name = "first_name", length = 50)
	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Column(name = "last_name", length = 50)
	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	@Column(name = "address", length = 200)
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "phone_number", length = 20)
	public String getPhoneNumber() {
		return this.phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	@Column(name = "injuries", length = 4)
	public String getInjuries() {
		return this.injuries;
	}

	public void setInjuries(String injuries) {
		this.injuries = injuries;
	}

	@Column(name = "seating_position", length = 4)
	public String getSeatingPosition() {
		return this.seatingPosition;
	}

	public void setSeatingPosition(String seatingPosition) {
		this.seatingPosition = seatingPosition;
	}

	@Column(name = "at_fault_insurance_company", length = 100)
	public String getAtFaultInsuranceCompany() {
		return this.atFaultInsuranceCompany;
	}

	public void setAtFaultInsuranceCompany(String atFaultInsuranceCompany) {
		this.atFaultInsuranceCompany = atFaultInsuranceCompany;
	}

	@Column(name = "victim_insurance_company", length = 45)
	public String getVictimInsuranceCompany() {
		return this.victimInsuranceCompany;
	}

	public void setVictimInsuranceCompany(String victimInsuranceCompany) {
		this.victimInsuranceCompany = victimInsuranceCompany;
	}

	@Column(name = "sequence_no")
	public Integer getSequenceNo() {
		return this.sequenceNo;
	}

	public void setSequenceNo(Integer sequenceNo) {
		this.sequenceNo = sequenceNo;
	}

	@Column(name = "status")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof OccupantsId))
			return false;
		OccupantsId castOther = (OccupantsId) other;

		return ((this.getReportId() == castOther.getReportId()) || (this
				.getReportId() != null && castOther.getReportId() != null && this
				.getReportId().equals(castOther.getReportId())))
				&& ((this.getFirstName() == castOther.getFirstName()) || (this
						.getFirstName() != null
						&& castOther.getFirstName() != null && this
						.getFirstName().equals(castOther.getFirstName())))
				&& ((this.getLastName() == castOther.getLastName()) || (this
						.getLastName() != null
						&& castOther.getLastName() != null && this
						.getLastName().equals(castOther.getLastName())))
				&& ((this.getAddress() == castOther.getAddress()) || (this
						.getAddress() != null && castOther.getAddress() != null && this
						.getAddress().equals(castOther.getAddress())))
				&& ((this.getPhoneNumber() == castOther.getPhoneNumber()) || (this
						.getPhoneNumber() != null
						&& castOther.getPhoneNumber() != null && this
						.getPhoneNumber().equals(castOther.getPhoneNumber())))
				&& ((this.getInjuries() == castOther.getInjuries()) || (this
						.getInjuries() != null
						&& castOther.getInjuries() != null && this
						.getInjuries().equals(castOther.getInjuries())))
				&& ((this.getSeatingPosition() == castOther
						.getSeatingPosition()) || (this.getSeatingPosition() != null
						&& castOther.getSeatingPosition() != null && this
						.getSeatingPosition().equals(
								castOther.getSeatingPosition())))
				&& ((this.getAtFaultInsuranceCompany() == castOther
						.getAtFaultInsuranceCompany()) || (this
						.getAtFaultInsuranceCompany() != null
						&& castOther.getAtFaultInsuranceCompany() != null && this
						.getAtFaultInsuranceCompany().equals(
								castOther.getAtFaultInsuranceCompany())))
				&& ((this.getVictimInsuranceCompany() == castOther
						.getVictimInsuranceCompany()) || (this
						.getVictimInsuranceCompany() != null
						&& castOther.getVictimInsuranceCompany() != null && this
						.getVictimInsuranceCompany().equals(
								castOther.getVictimInsuranceCompany())))
				&& ((this.getSequenceNo() == castOther.getSequenceNo()) || (this
						.getSequenceNo() != null
						&& castOther.getSequenceNo() != null && this
						.getSequenceNo().equals(castOther.getSequenceNo())))
				&& ((this.getStatus() == castOther.getStatus()) || (this
						.getStatus() != null && castOther.getStatus() != null && this
						.getStatus().equals(castOther.getStatus())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result
				+ (getReportId() == null ? 0 : this.getReportId().hashCode());
		result = 37 * result
				+ (getFirstName() == null ? 0 : this.getFirstName().hashCode());
		result = 37 * result
				+ (getLastName() == null ? 0 : this.getLastName().hashCode());
		result = 37 * result
				+ (getAddress() == null ? 0 : this.getAddress().hashCode());
		result = 37
				* result
				+ (getPhoneNumber() == null ? 0 : this.getPhoneNumber()
						.hashCode());
		result = 37 * result
				+ (getInjuries() == null ? 0 : this.getInjuries().hashCode());
		result = 37
				* result
				+ (getSeatingPosition() == null ? 0 : this.getSeatingPosition()
						.hashCode());
		result = 37
				* result
				+ (getAtFaultInsuranceCompany() == null ? 0 : this
						.getAtFaultInsuranceCompany().hashCode());
		result = 37
				* result
				+ (getVictimInsuranceCompany() == null ? 0 : this
						.getVictimInsuranceCompany().hashCode());
		result = 37
				* result
				+ (getSequenceNo() == null ? 0 : this.getSequenceNo()
						.hashCode());
		result = 37 * result
				+ (getStatus() == null ? 0 : this.getStatus().hashCode());
		return result;
	}

}

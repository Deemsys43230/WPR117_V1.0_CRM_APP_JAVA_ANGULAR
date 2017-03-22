package com.deemsys.project.entity;

// Generated 21 Mar, 2017 1:18:27 PM by Hibernate Tools 3.4.0.CR1

import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * County generated by hbm2java
 */
@Entity
@Table(name = "county", catalog = "CRM")
public class County implements java.io.Serializable {

	private Integer countyId;
	private String name;
	private Integer status;
	private Set<CrashReports> crashReportses = new HashSet<CrashReports>(0);

	public County() {
	}

	public County(String name, Integer status, Set<CrashReports> crashReportses) {
		this.name = name;
		this.status = status;
		this.crashReportses = crashReportses;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "county_id", unique = true, nullable = false)
	public Integer getCountyId() {
		return this.countyId;
	}

	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
	}

	@Column(name = "name", length = 45)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "status")
	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "county")
	public Set<CrashReports> getCrashReportses() {
		return this.crashReportses;
	}

	public void setCrashReportses(Set<CrashReports> crashReportses) {
		this.crashReportses = crashReportses;
	}

}

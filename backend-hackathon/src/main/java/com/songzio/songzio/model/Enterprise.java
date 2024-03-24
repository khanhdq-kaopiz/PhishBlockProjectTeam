package com.songzio.songzio.model;

import java.util.List;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name="enterprise_seq")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property="enterpriseID") 
public class Enterprise {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="enterprise_id")
	private Integer enterpriseID;
	
	@Column(name="enterprise_name")
	private String enterpriseName;
	
	@Column(name="enterprise_mail")
	private String enterpriseMail;
	
	@Column(name="representative_phone")
	private String representativePhone;
	
	@OneToMany(mappedBy="enterprise")
	@JsonIgnore
	private List<Website> websites;

	public Enterprise(Integer enterpriseID, String enterpriseName, String enterpriseMail, String representativePhone,
			List<Website> websites) {
		super();
		this.enterpriseID = enterpriseID;
		this.enterpriseName = enterpriseName;
		this.enterpriseMail = enterpriseMail;
		this.representativePhone = representativePhone;
		this.websites = websites;
	}

	public Enterprise() {
		super();
	}

	public String getEnterpriseName() {
		return enterpriseName;
	}

	public void setEnterpriseName(String enterpriseName) {
		this.enterpriseName = enterpriseName;
	}

	public Integer getEnterpriseID() {
		return enterpriseID;
	}

	public void setEnterpriseID(Integer enterpriseID) {
		this.enterpriseID = enterpriseID;
	}

	public String getEnterpriseMail() {
		return enterpriseMail;
	}

	public void setEnterpriseMail(String enterpriseMail) {
		this.enterpriseMail = enterpriseMail;
	}

	public String getRepresentativePhone() {
		return representativePhone;
	}

	public void setRepresentativePhone(String representativePhone) {
		this.representativePhone = representativePhone;
	}

	public List<Website> getWebsites() {
		return websites;
	}

	public void setWebsites(List<Website> websites) {
		this.websites = websites;
	}
}

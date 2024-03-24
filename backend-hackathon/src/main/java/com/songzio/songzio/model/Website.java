package com.songzio.songzio.model;

import java.util.List;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name = "website_seq")
public class Website {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "website_id")
	private Integer websiteID;
    
	@Column(name="website_name")
	private String websiteName;
	
	@Column(name="website_mint")
	private String websiteMint;
	
	@Column(name="website_image")
	private String websiteImage;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "enterprise_id")
	@Fetch(FetchMode.JOIN)
	private Enterprise enterprise;

	public Website(Integer websiteID, String websiteName, String websiteMint, Enterprise enterprise, String websiteImage) {
		super();
		this.websiteID = websiteID;
		this.websiteName = websiteName;
		this.enterprise = enterprise;
		this.websiteMint = websiteMint;
		this.websiteImage = websiteImage;
	}

	public Website() {
		super();
	}

	public Integer getWebsiteID() {
		return websiteID;
	}

	public void setWebsiteID(Integer websiteID) {
		this.websiteID = websiteID;
	}

	public String getWebsiteName() {
		return websiteName;
	}


	public void setWebsiteName(String websiteName) {
		this.websiteName = websiteName;
	}


	public Enterprise getEnterprise() {
		return enterprise;
	}

	public void setEnterprise(Enterprise enterprise) {
		this.enterprise = enterprise;
	}

	public String getWebsiteMint() {
		return websiteMint;
	}

	public void setWebsiteMint(String websiteMint) {
		this.websiteMint = websiteMint;
	}

	public String getWebsiteImage() {
		return websiteImage;
	}

	public void setWebsiteImage(String websiteImage) {
		this.websiteImage = websiteImage;
	}
}

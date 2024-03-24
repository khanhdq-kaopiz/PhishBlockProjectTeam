package com.songzio.songzio.form;

public class RegisterForm {
	
    private String enterpriseName;
	
	private String enterpriseMail;
	
	private String representativePhone;
	
	private String websiteName;
	
	private String websiteMint;
	
	public RegisterForm(String enterpriseName, String enterpriseMail, String representativePhone, String websiteName, String websiteMint) {
		super();
		this.enterpriseName = enterpriseName;
		this.enterpriseMail = enterpriseMail;
		this.representativePhone = representativePhone;
		this.websiteName = websiteName;
		this.websiteMint = websiteMint;
	}

	public String getEnterpriseName() {
		return enterpriseName;
	}

	public void setEnterpriseName(String enterpriseName) {
		this.enterpriseName = enterpriseName;
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

	public String getWebsiteName() {
		return websiteName;
	}

	public void setWebsiteName(String websiteName) {
		this.websiteName = websiteName;
	}

	public String getWebsiteMint() {
		return websiteMint;
	}

	public void setWebsiteMint(String websiteMint) {
		this.websiteMint = websiteMint;
	}

}

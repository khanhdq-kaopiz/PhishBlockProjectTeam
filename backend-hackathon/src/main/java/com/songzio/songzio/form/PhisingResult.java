package com.songzio.songzio.form;

public class PhisingResult {
	
    private int status;
    
    private String enterpriseName; 
    
    private String websiteName;
    
    private String websiteMint;

	public PhisingResult(int status, String enterpriseName, String websiteName, String websiteMint) {
		super();
		this.status = status;
		this.enterpriseName = enterpriseName;
		this.websiteName = websiteName;
		this.websiteMint = websiteMint;
	}

	public PhisingResult() {
		super();
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getEnterpriseName() {
		return enterpriseName;
	}

	public void setEnterpriseName(String enterpriseName) {
		this.enterpriseName = enterpriseName;
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

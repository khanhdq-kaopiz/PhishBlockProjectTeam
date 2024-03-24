package com.songzio.songzio.controller;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.songzio.songzio.form.CheckForm;
import com.songzio.songzio.form.RegisterForm;
import com.songzio.songzio.form.PhisingResult;
import com.songzio.songzio.jpa.EnterpriseRepository;
import com.songzio.songzio.jpa.WebsiteRepository;
import com.songzio.songzio.model.Enterprise;
import com.songzio.songzio.model.Website;
import jakarta.validation.Valid;

@RestController
@CrossOrigin
public class EnterpriseController {
	
	@Autowired
	private EnterpriseRepository enterpriseRepository;
	
	@Autowired
	private WebsiteRepository websiteRepository;

	public EnterpriseController(EnterpriseRepository enterpriseRepository, WebsiteRepository websiteRepository) {
		super();
		this.enterpriseRepository = enterpriseRepository;
		this.websiteRepository = websiteRepository;
	}

	@RequestMapping(path="/register", method=RequestMethod.POST)
	public String createUser(@RequestBody RegisterForm registerFormDTO) {		
		String enterpriseName = registerFormDTO.getEnterpriseName();
		String enterpriseMail = registerFormDTO.getEnterpriseMail();
		String representativePhone = registerFormDTO.getRepresentativePhone();
		String websiteName = registerFormDTO.getWebsiteName();
		String websiteMint = registerFormDTO.getWebsiteMint();
		
		if(enterpriseRepository.existsByEnterpriseName(enterpriseName) == false) {
			Enterprise enterprise = new Enterprise();
			enterprise.setEnterpriseName(enterpriseName);
			enterprise.setEnterpriseMail(enterpriseMail);
			enterprise.setRepresentativePhone(representativePhone);
			enterprise.setWebsites(new ArrayList<>());
			
			enterpriseRepository.save(enterprise);
		}
		
		Enterprise enterprise = enterpriseRepository.getByName(enterpriseName);
		
		Website website = new Website();
		website.setWebsiteName(websiteName);
		website.setEnterprise(enterprise);
		website.setWebsiteMint(websiteMint);
		enterprise.getWebsites().add(website);
		
	    enterpriseRepository.save(enterprise);
	    websiteRepository.save(website);
	    
		return enterpriseName;
	}
	
	@GetMapping(path="/data/{websiteMint}")
	  public Map<String, String> getData(@PathVariable("websiteMint") String websiteMint) {
	    Map<String, String> data = new HashMap<>();
	    
	    String websiteName = websiteRepository.getWebsiteNameByMint(websiteMint); 
	    String enterpriseName = enterpriseRepository.getEnterpriseNameByMint(websiteMint); 
	    data.put("websiteName", websiteName);
	    data.put("enterpriseName", enterpriseName);
	    return data;
	}
	
	@RequestMapping(path="/check", method=RequestMethod.POST)
	public PhisingResult checkPhishing(@RequestBody CheckForm checkForm) {
		String str1 = checkForm.getUrl();
        int m = str1.length();
        List<Website> websites = websiteRepository.findAll();
        
        for(Website website: websites) {
        	String str2 = website.getWebsiteName();
            int n = str2.length();

            // Create a DP table to store LCS lengths
            int[][] dp = new int[m + 1][n + 1];

            // Build the DP table
            for (int i = 1; i <= m; i++) {
                for (int j = 1; j <= n; j++) {
                    if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                        dp[i][j] = dp[i - 1][j - 1] + 1;
                    } else {
                        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                    }
                }
             }

             // Calculate the number of deletions and additions for potential phishing
            int delChars = 0;
            int addChars = 0;
            int i = m, j = n;

            while (i > 0 || j > 0) {
                if (i > 0 && j > 0 && str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    i--;
                    j--;
                } else if (j > 0 && (i == 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                    addChars++;
                    j--;
                } else {
                    delChars++;
                    i--;
                }
             }

            // Improved phishing detection logic:
            int maxLen = Math.max(m, n);
            double threshold = 0.2; // Adjust based on risk tolerance (0.2 for moderate)
            int a = (Math.max(addChars, delChars) > maxLen * threshold || Math.max(addChars, delChars) == 0) ? 1 : 0;
            if(a == 0) {
            	String websiteName = str2;
            	String enterpriseName = enterpriseRepository.getEnterpriseNameByWebsite(websiteName);
            	String websiteMint = websiteRepository.getMintNameByWebsiteName(websiteName);
            	return new PhisingResult(0, enterpriseName, websiteName, websiteMint);
            }
        }
        return new PhisingResult(1, null, null, null);
    }
}

package com.songzio.songzio.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.songzio.songzio.model.Enterprise;
import com.songzio.songzio.model.Website;

@Repository
public interface WebsiteRepository extends JpaRepository<Website, Integer>{
	
	@Query(value = "SELECT website_name FROM website_seq WHERE website_mint = :websiteMint", nativeQuery = true)
	public String getWebsiteNameByMint(String websiteMint);
	
	@Query(value = "SELECT website_mint FROM website_seq WHERE website_name = :websiteName", nativeQuery = true)
	public String getMintNameByWebsiteName(String websiteName);
}

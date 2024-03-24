package com.songzio.songzio.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.songzio.songzio.model.Enterprise;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Integer>{

	boolean existsByEnterpriseName(String enterpriseName);

	@Query(value = "SELECT * FROM enterprise_seq WHERE enterprise_name = :enterpriseName", nativeQuery = true)
	public Enterprise getByName(String enterpriseName);
	
	@Query(value = "SELECT e.enterprise_name FROM enterprise_seq e JOIN website_seq w ON e.enterprise_id = w.enterprise_id WHERE w.website_mint = :websiteMint", nativeQuery = true)
	public String getEnterpriseNameByMint(String websiteMint);
	
	@Query(value = "SELECT e.enterprise_name FROM enterprise_seq e JOIN website_seq w ON e.enterprise_id = w.enterprise_id WHERE w.website_name = :websiteName", nativeQuery = true)
	public String getEnterpriseNameByWebsite(String websiteName);

}

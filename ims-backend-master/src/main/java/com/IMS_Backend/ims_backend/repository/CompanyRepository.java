package com.IMS_Backend.ims_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.IMS_Backend.ims_backend.model.Company;


public interface CompanyRepository extends JpaRepository<Company, Long> {
	@Query(value = "SELECT supplier_id FROM g3supplier_company WHERE company_id = :companyId", nativeQuery = true)
    List<Long> findSupplierIdsByCompanyId(@Param("companyId") Long companyId);
}

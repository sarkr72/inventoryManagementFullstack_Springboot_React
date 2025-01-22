package com.IMS_Backend.ims_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.IMS_Backend.ims_backend.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier,Long>{

	@Query(value = "SELECT * FROM g3supplier s WHERE s.company_id = :companyId", nativeQuery = true)
    List<Supplier> findByCompanyId(@Param("companyId") Long companyId);
	
	Optional<Supplier> findSupplierByName(String name);
}

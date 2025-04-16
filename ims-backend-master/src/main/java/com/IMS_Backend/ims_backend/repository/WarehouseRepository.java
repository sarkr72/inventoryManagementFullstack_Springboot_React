package com.IMS_Backend.ims_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.IMS_Backend.ims_backend.model.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse,Long>{
	   @Query(value = "SELECT * FROM g3warehouse w WHERE w.company_id = :companyId", nativeQuery = true)
	    List<Warehouse> findByCompanyId(@Param("companyId") Long companyId);
}

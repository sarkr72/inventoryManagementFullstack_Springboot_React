package com.IMS_Backend.ims_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.IMS_Backend.ims_backend.model.ProductLocation;

public interface ProductLocationRepository extends JpaRepository<ProductLocation, Long> {
//	@Query(value = "SELECT * FROM product_locations WHERE location LIKE :rowColPattern", nativeQuery = true)
//    List<ProductLocation> findByRowAndCol(@Param("rowColPattern") String rowColPattern);
	@Query(value = "SELECT * FROM g3product_locations WHERE location LIKE :rowColPattern AND company = :company", nativeQuery = true)
	List<ProductLocation> findByRowColWhAndCompany(@Param("rowColPattern") String rowColPattern,
			@Param("company") String company);

//	@Query(value = "SELECT * FROM product_locations pl WHERE TRIM(BOTH FROM LOWER(pl.product)) = LOWER(TRIM(BOTH FROM :product))", nativeQuery = true)
//	List<ProductLocation> findByProductName(@Param("product") String product);
	@Query(value = "SELECT * FROM g3product_locations pl "
			+ "WHERE TRIM(BOTH FROM LOWER(pl.product)) = LOWER(TRIM(BOTH FROM :product)) "
			+ "AND TRIM(BOTH FROM LOWER(pl.company)) = LOWER(TRIM(BOTH FROM :company))", nativeQuery = true)
	List<ProductLocation> findByProductNameAndCompany(@Param("product") String product,
			@Param("company") String company);
	
	@Query(value = "SELECT * FROM g3product_locations WHERE company = :company", nativeQuery = true)
	List<ProductLocation> findByCompany(@Param("company") String company);

}

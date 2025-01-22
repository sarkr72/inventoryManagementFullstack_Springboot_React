package com.IMS_Backend.ims_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS_Backend.ims_backend.model.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
	List<PurchaseOrder> findByCompany(String company);
}

package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Supplier;

public interface SupplierService {
	
	Supplier createSupplier(Supplier supplier);
	
	Supplier getSupplierById(Long supplierId);
	
	Supplier getSupplierByName(String name);
	
 	List<Supplier> getAllSuppliers();

 	List<Supplier> getSuppliersByCompanyId(Long id);
 	
    Supplier updateSupplier(Long supplierId, Supplier supplier);

    void deleteSupplierById(Long supplierId);
}

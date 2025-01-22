package com.IMS_Backend.ims_backend.services;

import java.util.List;


import com.IMS_Backend.ims_backend.model.Warehouse;

public interface WarehouseService {
		Warehouse createWarehouse(Warehouse warehouse);
		
		Warehouse getWarehouseById(Long warehouseId);
		
	 	List<Warehouse> getAllWarehouses();
	 	
	 	List<Warehouse> getWarehousesByCompany(Long id);

	    Warehouse updateWarehouse(Long warehouseId, Warehouse warehouse);

	    void deleteWarehouseById(Long warehouseId);
}

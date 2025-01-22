 package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.model.Location;
import com.IMS_Backend.ims_backend.model.Warehouse;
import com.IMS_Backend.ims_backend.repository.LocationRepository;
import com.IMS_Backend.ims_backend.repository.WarehouseRepository;
import com.IMS_Backend.ims_backend.services.WarehouseService;

@Service
public class WarehouseServiceImpl implements WarehouseService{
	
	@Autowired
	private WarehouseRepository warehouseRepository;
	
	
	@Override
	public Warehouse createWarehouse(Warehouse warehouse) {
		 Warehouse savedWarehouse = warehouseRepository.save(warehouse);
	     return savedWarehouse;
	}

	@Override
	public Warehouse getWarehouseById(Long warehouseId) {
		Warehouse warehouse = warehouseRepository.findById(warehouseId).orElseThrow(()-> new NotFoundException("Warehouse is not found with id: " + warehouseId));
		return warehouse;
	}

	@Override
	public List<Warehouse> getAllWarehouses() {
		return warehouseRepository.findAll();
	}

	@Override
	public Warehouse updateWarehouse(Long warehouseId, Warehouse warehouse) {
		Warehouse savedWarehouse = warehouseRepository.findById(warehouseId).orElseThrow(()-> new NotFoundException("Warehouse is not found with id: " + warehouseId));
		savedWarehouse.setName(warehouse.getName());
		savedWarehouse.setAddress(warehouse.getAddress());
		savedWarehouse.setCompany(warehouse.getCompany());
		savedWarehouse.setMaxCapacity(warehouse.getMaxCapacity());

//		if (warehouse.getLocations() != null) {
//			Set<Long> ids = warehouse.getLocations().stream().map(Location::getId).collect(Collectors.toSet());
//			Set<Location> locations = locationRepository.findAllById(ids).stream().collect(Collectors.toSet());
//			for(Location e: locations) {
//				savedWarehouse.addLocation(e);
//			}
//		}
		

		Warehouse updatedWarehouse = warehouseRepository.save(savedWarehouse);
		
		return updatedWarehouse;
	}

	@Override
	public void deleteWarehouseById(Long warehouseId) {
		Warehouse savedwarehouse = warehouseRepository.findById(warehouseId).orElseThrow(()-> new NotFoundException("warehouse is not found with id: " + warehouseId));
		warehouseRepository.delete(savedwarehouse);
		
	}

	@Override
	public List<Warehouse> getWarehousesByCompany(Long id) {
		List<Warehouse> list = warehouseRepository.findByCompanyId(id);
		return list;
	}

}

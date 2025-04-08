package com.IMS_Backend.ims_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IMS_Backend.ims_backend.model.Warehouse;
import com.IMS_Backend.ims_backend.services.WarehouseService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/warehouse")
public class WarehouseController {

	@Autowired
	private WarehouseService warehouseService;
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	@PostMapping
    public ResponseEntity<Warehouse> createWarehouse(@RequestBody Warehouse warehouse){
        Warehouse savedWarehouse = warehouseService.createWarehouse(warehouse);
        return new ResponseEntity<>(savedWarehouse, HttpStatus.CREATED);
    }
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/{id}")
	public ResponseEntity<Warehouse> getWarehouse(@PathVariable("id") Long id){
		Warehouse warehouse = warehouseService.getWarehouseById(id);
		
		return new ResponseEntity<>(warehouse, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/companyWarehouse/{id}")
	public ResponseEntity<List<Warehouse>> getWarehouseByCompany(@PathVariable("id") Long id){
		List<Warehouse> warehouses = warehouseService.getWarehousesByCompany(id);
		
		return ResponseEntity.ok(warehouses);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping
	public ResponseEntity<List<Warehouse>> getAllwarehouses(){
		List<Warehouse> warehouses = warehouseService.getAllWarehouses();
		
		return ResponseEntity.ok(warehouses);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	@PutMapping("/{id}")
	public ResponseEntity<Warehouse> updateWarehouse(@PathVariable("id") Long id, @RequestBody Warehouse warehouse){
		Warehouse updatedWarehouse = warehouseService.updateWarehouse(id, warehouse);
		
		return new ResponseEntity<>(updatedWarehouse, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteWarehouse(@PathVariable("id") Long id){
		warehouseService.deleteWarehouseById(id);
		
		return ResponseEntity.ok("warehouse deleted successfully");
	}
	
	
}

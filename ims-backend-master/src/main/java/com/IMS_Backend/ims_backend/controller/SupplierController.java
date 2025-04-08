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

import com.IMS_Backend.ims_backend.model.Supplier;
import com.IMS_Backend.ims_backend.services.SupplierService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
	@Autowired
	private SupplierService supplierService;
	
	@PreAuthorize("hasAnyRole( 'MANAGER')")
	@PostMapping
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier){
        Supplier savedSupplier = supplierService.createSupplier(supplier);
        return new ResponseEntity<>(savedSupplier, HttpStatus.CREATED);
    }
	
	@PreAuthorize("hasAnyRole('MANAGER', 'EMPLOYEE')")
	@GetMapping("/{id}")
	public ResponseEntity<Supplier> getSupplier(@PathVariable("id") Long id){
		Supplier supplier = supplierService.getSupplierById(id);
		
		return new ResponseEntity<>(supplier, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('MANAGER', 'EMPLOYEE')")
	@GetMapping("/name/{name}")
	public ResponseEntity<Supplier> getSupplierName(@PathVariable("name") String name){
		Supplier supplier = supplierService.getSupplierByName(name);
		
		return new ResponseEntity<>(supplier, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole( 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/companySuppliers/{id}")
	public ResponseEntity<List<Supplier>> getSuppliersByCompany(@PathVariable("id") Long id){
		List<Supplier> suppliers = supplierService.getSuppliersByCompanyId(id);
		
		return ResponseEntity.ok(suppliers);
	}
	
	@PreAuthorize("hasAnyRole('MANAGER', 'EMPLOYEE')")
	@GetMapping
	public ResponseEntity<List<Supplier>> getAllsuppliers(){
		List<Supplier> suppliers = supplierService.getAllSuppliers();
		
		return ResponseEntity.ok(suppliers);
	}
	
	@PreAuthorize("hasRole( 'MANAGER')")
	@PutMapping("/{id}")
	public ResponseEntity<Supplier> updateSupplier(@PathVariable("id") Long id, @RequestBody Supplier supplier){
		Supplier updatedSupplier = supplierService.updateSupplier(id, supplier);
		
		return new ResponseEntity<>(updatedSupplier, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasRole('MANAGER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteSupplier(@PathVariable("id") Long id){
		supplierService.deleteSupplierById(id);
		
		return ResponseEntity.ok("supplier deleted successfully");
	}
}

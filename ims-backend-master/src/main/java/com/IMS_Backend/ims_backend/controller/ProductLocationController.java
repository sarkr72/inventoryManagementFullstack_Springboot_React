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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.IMS_Backend.ims_backend.model.ProductLocation;
import com.IMS_Backend.ims_backend.services.ProductLocationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/productLocations")
public class ProductLocationController {

	@Autowired
	private ProductLocationService plService;

	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PostMapping
	public ResponseEntity<ProductLocation> createcompany(@RequestBody ProductLocation company) {
		ProductLocation savedcompany = plService.createProductLocaiton(company);
		return new ResponseEntity<>(savedcompany, HttpStatus.CREATED);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/{id}")
	public ResponseEntity<ProductLocation> getcompany(@PathVariable("id") Long id) {
		ProductLocation company = plService.getProductLocationById(id);

		return new ResponseEntity<>(company, HttpStatus.CREATED);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/company/{company}")
	public List<ProductLocation> getPlByCompany(@PathVariable("company") String company) {
		return plService.getByCompany(company);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/plByLocation")
	public List<ProductLocation> getLocations(@RequestParam int row, @RequestParam int col, @RequestParam String wh, @RequestParam String company) {
		return plService.getProductLocationsByLocation(row, col, wh, company);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/plByProduct")
	public List<ProductLocation> getPLocations(@RequestParam("product") String product, @RequestParam("company") String company) {
		return plService.getProductLocationsByProduct(product, company);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping
	public ResponseEntity<List<ProductLocation>> getAllcompanys() {
		List<ProductLocation> companys = plService.getAllProductLocations();

		return ResponseEntity.ok(companys);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PutMapping("/{id}")
	public ResponseEntity<ProductLocation> updatecompany(@PathVariable("id") Long id,
			@RequestBody ProductLocation company) {
		ProductLocation updatedcompany = plService.updateProductLocation(id, company);

		return new ResponseEntity<>(updatedcompany, HttpStatus.CREATED);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletecompany(@PathVariable("id") Long id) {
		plService.deleteProductLocationById(id);

		return ResponseEntity.ok("company deleted successfully");
	}

}

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

import com.IMS_Backend.ims_backend.model.Product;
import com.IMS_Backend.ims_backend.services.ProductService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        Product createdProduct = productService.createProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProduct(@PathVariable("id") Long id){
		Product searchedProduct= productService.getProductById(id);
		
		return new ResponseEntity<>(searchedProduct, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/name/{name}")
	public ResponseEntity<Product> getProduct(@PathVariable("name") String name){
		Product searchedProduct= productService.getProductByName(name);
		
		return new ResponseEntity<>(searchedProduct, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/company/{companyId}")
    public List<Product> getProductsByCompanyId(@PathVariable Long companyId) {
	        return productService.getProductsByCompanyId(companyId);
	    }
	  
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping
	public ResponseEntity<List<Product>> getAllProducts(){
		List<Product> allProducts = productService.getAllProducts();
		
		return ResponseEntity.ok(allProducts);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PutMapping("/{id}")
	public ResponseEntity<Product> updatecompany(@PathVariable("id") Long id, @RequestBody Product product){
		Product updatedProduct = productService.updateProduct(id, product);
		
		return new ResponseEntity<>(updatedProduct, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PutMapping("/name/{name}")
	public ResponseEntity<Product> updateProductWithName(@PathVariable("name") String name, @RequestBody Product product){
		Product updatedProduct = productService.updateProductByName(name, product);
		
		return new ResponseEntity<>(updatedProduct, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletecompany(@PathVariable("id") Long id){
		productService.deleteProductById(id);
		
		return ResponseEntity.ok("Product deleted successfully");
	}
	
	
}

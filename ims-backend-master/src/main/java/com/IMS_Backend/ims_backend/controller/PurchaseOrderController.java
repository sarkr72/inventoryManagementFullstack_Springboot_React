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

import com.IMS_Backend.ims_backend.model.PurchaseOrder;
import com.IMS_Backend.ims_backend.services.PurchaseOrderService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/purchaseOrder")
public class PurchaseOrderController {
	
	@Autowired
	private PurchaseOrderService purchaseOrderService;
	
	@PreAuthorize("hasRole( 'MANAGER')")
	@PostMapping
	public ResponseEntity<PurchaseOrder> createOrder(@RequestBody PurchaseOrder order){
		PurchaseOrder createPO = purchaseOrderService.createOrder(order);
		return new ResponseEntity<>(createPO, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole( 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/{id}")
	public ResponseEntity<PurchaseOrder> getPurchaseOrder(@PathVariable("id") Long id){
		PurchaseOrder searchedPO = purchaseOrderService.getOrderById(id);
		return new ResponseEntity<>(searchedPO, HttpStatus.CREATED);
		
	}
	
	@PreAuthorize("hasAnyRole( 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/posByCompany/{id}")
	public ResponseEntity<List<PurchaseOrder>> getPosByCompany(@PathVariable("id") String name){
		List<PurchaseOrder> allPurchaseOrders = purchaseOrderService.getOrdersByCompany(name);
		return new ResponseEntity<>(allPurchaseOrders, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole( 'MANAGER', 'EMPLOYEE')")
	@GetMapping
	public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrders(){
		List<PurchaseOrder> allPurchaseOrders = purchaseOrderService.getAllOrders();
		return new ResponseEntity<>(allPurchaseOrders, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasRole( 'MANAGER')")
	@PutMapping("/{id}")
	public ResponseEntity<PurchaseOrder> updatePurchaseOrder(@PathVariable("id") Long id, @RequestBody PurchaseOrder purchaseOrder){
		PurchaseOrder updatePurchaseOrder = purchaseOrderService.updateOrder(id, purchaseOrder);
		return new ResponseEntity<>(updatePurchaseOrder, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasRole( 'MANAGER')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePurchaseOrder (@PathVariable("id") Long id) {
		purchaseOrderService.deleteOrderById(id);
		return ResponseEntity.ok("Purchase Order successfully deleted");
	}
}

package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.PurchaseOrder;


public interface PurchaseOrderService {
	
	PurchaseOrder createOrder(PurchaseOrder order);
	
	PurchaseOrder getOrderById(Long orderID);
	
	List<PurchaseOrder> getAllOrders();
	
	List<PurchaseOrder> getOrdersByCompany(String company);
	
	PurchaseOrder updateOrder(Long orderID, PurchaseOrder order);
	
	void deleteOrderById(Long orderId);
	 
	
}

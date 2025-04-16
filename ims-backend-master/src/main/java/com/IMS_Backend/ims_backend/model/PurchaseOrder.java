package com.IMS_Backend.ims_backend.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "g3PurchaseOrder")
public class PurchaseOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "date added", nullable = false)
	private String date;

	@Column(name = "quantity", nullable = false)
	private int quantity;

	@Column(name = "totalAmount", nullable = false)
	private double totalAmount;

//	@Column(name = "unitPrie", nullable = false)
//	private double unitPrice;
	
	@Column(name = "po", nullable = false)
	private String po;

//	@ManyToOne(optional = false)
//	@JoinColumn(name = "employee", nullable = false)
//	@JsonIgnoreProperties({ "firstName", "lastName", "email", "password", "phone", "role", "company", "companyId" })
//	private Employee employee;

	@Column(name = "employee", nullable = false)
	private String employee;
	
//	@ManyToOne(optional = false)
//	@JoinColumn(name = "company", nullable = false)
//	@JsonIgnoreProperties({ "employees", "warehouses", "suppliers"})
//	private Company company;

	@Column(name = "company", nullable = false)
	private String company;
	
	@ElementCollection
	@CollectionTable(name = "g3purchase_order_products", joinColumns = @JoinColumn(name = "purchase_order_id"))
	@Column(name = "product_name")
	private Set<String> productNames = new HashSet<>();

//	@ManyToOne(optional = false)
//	@JoinColumn(name = "supplier", nullable = false)
//	@JsonIgnoreProperties({ "companies"})
//	private Supplier supplier;
	
	@Column(name = "supplier", nullable = false)
	private String supplier;

	public PurchaseOrder() {

	}



	public PurchaseOrder(String date, int quantity, double totalAmount, String po, String employee, String company,
			Set<String> productNames, String supplier) {
		super();
		this.date = date;
		this.quantity = quantity;
		this.totalAmount = totalAmount;
		this.po = po;
		this.employee = employee;
		this.company = company;
		this.productNames = productNames;
		this.supplier = supplier;
	}



	public String getPo() {
		return po;
	}

	public void setPo(String po) {
		this.po = po;
	}


	public void addProduct(String st) {
		productNames.add(st);
	}
	
	public Set<String> getProductNames() {
		return productNames;
	}

	public void setProductNames(Set<String> productNames) {
		this.productNames = productNames;
	}


	public Long getId() {
		return id;
	}

//	public Company getCompany() {
//		return company;
//	}
//
//	public void setCompany(Company company) {
//		this.company = company;
//	}
//
//	public Supplier getSupplier() {
//		return supplier;
//	}
//
//	public void setSupplier(Supplier supplier) {
//		this.supplier = supplier;
//	}

//	@JsonProperty("supplierId")
//	public Long getSupplierId() {
//		return supplier != null ? supplier.getId() : null;
//	}


	public String getEmployee() {
		return employee;
	}



	public void setEmployee(String employee) {
		this.employee = employee;
	}



	public String getCompany() {
		return company;
	}



	public void setCompany(String company) {
		this.company = company;
	}



	public String getSupplier() {
		return supplier;
	}



	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}



	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
//
//	public Employee getEmployee() {
//		return employee;
//	}
//
//	public void setEmployee(Employee employee) {
//		this.employee = employee;
//	}


	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		PurchaseOrder category = (PurchaseOrder) o;
		return Objects.equals(id, category.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

}

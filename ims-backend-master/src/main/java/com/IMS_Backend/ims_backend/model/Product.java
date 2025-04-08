package com.IMS_Backend.ims_backend.model;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "g3Product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "category")
	private String category;

	@Column(name = "Restocklevel")
	private int restockLevel;

	@Column(name = "unitPrice")
	private double unitPrice;

	@Column(name = "quantity")
	private int quantity;

	@ManyToOne
	@JoinColumn(name = "company_id", nullable = false)
	@JsonIgnoreProperties({ "products", "address", "contact", "employees", "warehouses", "suppliers", "companyId" })
	private Company company;

//	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
//	@JoinTable(name = "product_purchaseOrder", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "purchaseOrder_id"))
//	private Set<PurchaseOrder> pos = new HashSet<>();

//	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Set<ProductLocation> productLocations = new HashSet<>();

	public Product() {

	}

	public Product(String name, String category, int restockLevel, double unitPrice, int quantity, Company company) {
		super();
		this.name = name;
		this.category = category;
		this.restockLevel = restockLevel;
		this.unitPrice = unitPrice;
		this.quantity = quantity;
		this.company = company;
	}

//	public Set<ProductLocation> getProductLocations() {
//		return productLocations;
//	}
//
//	public void setProductLocations(Set<ProductLocation> productLocations) {
//		this.productLocations = productLocations;
//	}

//	public Set<PurchaseOrder> getPos() {
//		return pos;
//	}
//
//	public void setPos(Set<PurchaseOrder> pos) {
//		this.pos = pos;
//	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getRestockLevel() {
		return restockLevel;
	}

	public void setRestockLevel(int restockLevel) {
		this.restockLevel = restockLevel;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		Product product = (Product) o;
		return Objects.equals(id, product.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

}

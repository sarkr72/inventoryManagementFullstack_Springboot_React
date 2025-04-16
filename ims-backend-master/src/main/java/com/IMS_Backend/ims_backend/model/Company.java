package com.IMS_Backend.ims_backend.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "g3companies")
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", unique=true)
	private String name;

	@Column(name = "address", unique=true)
	private String address;

	@Column(name = "contact")
	private String contact;

	@Column(name = "logoUrl")
	private String logoUrl;

	@OneToMany(mappedBy = "company")
	@JsonIgnoreProperties("company")
	private List<Employee> employees= new ArrayList<>();
	
	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("company")
	private List<Warehouse> warehouses= new ArrayList<>();
	
	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties("company")
	private List<Product> products= new ArrayList<>();
	
	@ManyToMany( fetch = FetchType.LAZY)
	@JoinTable(name = "g3supplier_company", joinColumns = @JoinColumn(name = "company_id"), inverseJoinColumns = @JoinColumn(name = "supplier_id"))
	@JsonIgnoreProperties("companies")
	private List<Supplier> suppliers = new ArrayList<>();
	
//	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonIgnoreProperties("company")
//	private List<ProductLocation> productLocations= new ArrayList<>();
	
	public Company() {

	}

	

public Company(String name, String address, String contact, String logoUrl) {
	this.name = name;
	this.address = address;
	this.contact = contact;
	this.logoUrl = logoUrl;
}




public String getLogoUrl() {
	return logoUrl;
}



public void setLogoUrl(String logoUrl) {
	this.logoUrl = logoUrl;
}



	//	public List<ProductLocation> getProductLocations() {
//		return productLocations;
//	}
//
//	public void setProductLocations(List<ProductLocation> productLocations) {
//		this.productLocations = productLocations;
//	}
//
//	public void addProductLocation(ProductLocation pl) {
//		productLocations.add(pl);
//	}
//	
//	public void removeProductLocaitons(ProductLocation pl) {
//		productLocations.remove(pl);
//	}
//	
	public void addWarehouse(Warehouse wh) {
		warehouses.add(wh);
		wh.setCompany(this);
	}
	
	public void removeWarehouse(Warehouse wh) {
		warehouses.remove(wh);
		wh.setCompany(this);
	}
	public void addEmployee(Employee e) {
		employees.add(e);
		e.setCompany(this);
	}
	
	public void removeEmployee(Employee e) {
		employees.remove(e);
		e.setCompany(this);
	}
	
	public void removeSupplier(Supplier e) {
		suppliers.remove(e);
	}
	
	public void addSupplier(Supplier supplier) {
		this.suppliers.add(supplier);
		supplier.getCompanies().add(this);
	}
	
	@JsonIgnoreProperties({"employees"})
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}


	public List<Supplier> getSuppliers() {
		return suppliers;
	}

	public void setSuppliers(List<Supplier> suppliers) {
		this.suppliers = suppliers;
	}


	public List<Warehouse> getWarehouses() {
		return warehouses;
	}

	public void setWarehouses(List<Warehouse> warehouses) {
		this.warehouses = warehouses;
	}

	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}

	public Long getId() {
		return id;
	}

	 @Override
	    public boolean equals(Object o) {
	        if (this == o) return true; 
	        if (o == null || getClass() != o.getClass()) return false;
	        Company company = (Company) o;
	        return Objects.equals(id, company.id); 
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(id); 
	    }
	@Override
	public String toString() {
		return "Company [id=" + id + ", name=" + name + ", address=" + address + ", contact=" + contact + ", supplier="
				+ suppliers + "]";
	}

}

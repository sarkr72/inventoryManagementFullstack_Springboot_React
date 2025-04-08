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
@Table(name = "g3supplier")
public class Supplier {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "name", unique=false)
	private String name;
	
	@Column(name = "address", unique=false)
	private String address;
	
	@Column(name = "contact")
	private String contact;

	
	@ManyToMany(mappedBy = "suppliers")
	@JsonIgnoreProperties({"suppliers", "address", "contact", "employees", "warehouses", "productLocations"})
	private List<Company> companies = new ArrayList<>();
	
	public Supplier() {
		
	}

	public Supplier(String name, String address, String contact) {
		this.name = name;
		this.address = address;
		this.contact = contact;
	}

	public void addCompany(Company company) {
		this.companies.add(company);
		company.getSuppliers().add(this);
	}
	
	public String getName() {
		return name;
	}

	public void removeCompany(Company e) {
		companies.remove(e);
	}
	

	public List<Company> getCompanies() {
		return companies;
	}

	public void setCompanies(List<Company> companies) {
		this.companies = companies;
	}

//	public List<PurchaseOrder> getPos() {
//		return pos;
//	}
//
//	public void setPos(List<PurchaseOrder> pos) {
//		this.pos = pos;
//	}

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
	

	public Long getId() {
		return id;
	}


	
	@Override
    public boolean equals(Object o) {
        if (this == o) return true; 
        if (o == null || getClass() != o.getClass()) return false; 
        Supplier supplier = (Supplier) o;
        return Objects.equals(id, supplier.id); 
    }

    @Override
    public int hashCode() {
        return Objects.hash(id); 
    }
	
	
}

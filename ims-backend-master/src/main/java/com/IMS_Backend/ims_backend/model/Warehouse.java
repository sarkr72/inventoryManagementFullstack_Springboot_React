package com.IMS_Backend.ims_backend.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "g3warehouse")
public class Warehouse {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "address")
	private String address;

	@ManyToOne()
	@JoinColumn(name = "company_id", nullable = true)
	@JsonIgnoreProperties({"warehouses", "employees", "address", "contact", "suppliers", "companyId"})
	private Company company;




	@Column(name = "max_capacity")
	private int maxCapacity;

	@OneToMany(mappedBy = "warehouse", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties({"warehouse", "companyId"})
	private Set<Location> locations = new HashSet<>();
	
	public Warehouse() {

	}

	public Warehouse(String name, String address, Company company, int maxCapacity) {
		this.name = name;
		this.address = address;
		this.company = company;
		this.maxCapacity = maxCapacity;

	}

	public Set<Location> getLocations() {
		return locations;
	}

	public void setLocations(Set<Location> locations) {
		this.locations = locations;
	}
	
	public void addLocation(Location location) {
		locations.add(location);
		location.setWarehouse(this);
	}


//	public void addLocation(Location location) {
//		locations.add(location);
//		location.setWarehouse(this);
//	}
//
//	public void removeLocation(Location location) {
//		locations.remove(location);
//		location.setWarehouse(null);
//	}

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

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public int getMaxCapacity() {
		return maxCapacity;
	}

	public void setMaxCapacity(int maxCapacity) {
		this.maxCapacity = maxCapacity;
	}

	@JsonProperty("companyId")
	public Long getCompanyId() {
		return company != null ? company.getId() : null;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "warehouse [name=" + name + ", address=" + address + ", company=" + company + ", maxCapacity="
				+ maxCapacity + "]";
	}

}

package com.IMS_Backend.ims_backend.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "g3location")
public class Location {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

//	@Column(name = "rows", nullable=false)
//	private int row;
//
//	@Column(name = "col", nullable=false)
//	private int col;

	@Column(name = "row_position", nullable = false)
	private int row;

	@Column(name = "col_position", nullable = false)
	private int col;

	
	@Column(name = "is_empty", nullable=false)
	private boolean isEmpty;

	@Column(name = "max_capacity", nullable=false)
	private int maxCapacity;

	@Column(name = "stock", nullable=true)
	private int stock;
	
	@Column(name = "available", nullable=true)
	private int available;
	
//	@ManyToOne
//	@JoinColumn(name = "warehouse_id", nullable=false)
//	@JsonIgnore
//	private Warehouse warehouse;


//	@OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	private Set<ProductLocation> productLocations = new HashSet<>();

	@ManyToOne
	@JoinColumn(name = "warehouse_id", nullable = false)
	@JsonIgnoreProperties({"locations", "maxCapacity", "company", "companyId", "warehouseId"})
	private Warehouse warehouse;
	
	public Location() {

	}


	public Location(int row, int col, boolean isEmpty, int maxCapacity, int stock, int available, Warehouse warehouse) {
		super();
		this.row = row;
		this.col = col;
		this.isEmpty = isEmpty;
		this.maxCapacity = maxCapacity;
		this.stock = stock;
		this.available = available;
		this.warehouse = warehouse;
	}




	public int getStock() {
	return stock;
}



public void setStock(int stock) {
	this.stock = stock;
}



public int getAvailable() {
	return available;
}



public void setAvailable(int available) {
	this.available = available;
}



	public int getRow() {
		return row;
	}

	public void setRow(int row) {
		this.row = row;
	}

	public int getCol() {
		return col;
	}

	public void setCol(int col) {
		this.col = col;
	}

	@JsonProperty("isEmpty")
	public boolean isEmpty() {
	    return isEmpty;
	}

	@JsonProperty("isEmpty")
	public void setEmpty(boolean isEmpty) {
	    this.isEmpty = isEmpty;
	}

	public int getMaxCapacity() {
		return maxCapacity;
	}

	public Warehouse getWarehouse() {
		return warehouse;
	}

	public void setWarehouse(Warehouse warehouse) {
		this.warehouse = warehouse;
	}

	public void setMaxCapacity(int maxCapacity) {
		this.maxCapacity = maxCapacity;
	}

	public Long getId() {
		return id;
	}

	@JsonProperty("warehouseId")
	public Long getWarehouseId() {
		return warehouse != null ? warehouse.getId() : null;
	}

	@JsonProperty("warehouseName")
	public String getWarehousNamed() {
		return warehouse != null ? warehouse.getName() : null;
	}
	
}

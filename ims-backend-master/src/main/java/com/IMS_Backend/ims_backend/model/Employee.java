
package com.IMS_Backend.ims_backend.model;


import java.util.HashSet;
import java.util.Set;

import org.antlr.v4.runtime.misc.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "g3employees")
public class Employee {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "phone")
	private String phone;
	
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "g3users_roles",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id", nullable=false),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id", nullable=false)
    )
    private Set<Role> roles = new HashSet<>();
	
	@ManyToOne
    @JoinColumn(name = "company_id", nullable=false)
	@JsonIgnoreProperties({"employees", "employees", "warehouses", "suppliers", "companyId"})
	private Company company;
    
	public Employee() {
		
	}

	

public Employee(String firstName, String lastName, String email, String password, String phone, Set<Role> roles,
		Company company) {
	super();
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.password = password;
	this.phone = phone;
	this.roles = roles;
	this.company = company;
}



public Set<Role> getRoles() {
	return roles;
}



public void setRoles(Set<Role> roles) {
	this.roles = roles;
}




	public Long getId() {
		return id;
	}
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}


	@JsonProperty("companyId")
	public Long getCompanyId() {
		return company != null ? company.getId() : null;
	}
	


	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getFullName() {
        return firstName + " " + lastName;
    }
	
	@Override
	public String toString() {
		return "Employee [ id=" + id + "firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", password="
				+ password + ", phone=" + phone + ", company=" + company + "]";
	}
	
	
	
	
}

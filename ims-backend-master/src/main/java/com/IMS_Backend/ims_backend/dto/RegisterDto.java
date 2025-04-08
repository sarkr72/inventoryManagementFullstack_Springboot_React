package com.IMS_Backend.ims_backend.dto;

import com.IMS_Backend.ims_backend.model.Company;

public class RegisterDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private Company company;
    private String role;
    
    public RegisterDto() {
    }

	public RegisterDto(String firstName, String lastName, String email, String password, String phone, Company company,
			String role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.company = company;
		this.role = role;
	}


	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
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
}
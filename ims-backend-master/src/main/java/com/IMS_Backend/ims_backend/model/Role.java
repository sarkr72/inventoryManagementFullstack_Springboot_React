package com.IMS_Backend.ims_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "g3roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public Role() {}

    public Role( String name) {
        this.name = name;
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

	@Override
	public String toString() {
		return "Role [id=" + id + ", name=" + name + "]";
	}
    
    
}

package com.IMS_Backend.ims_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS_Backend.ims_backend.model.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findByName(String name);
	
	
}
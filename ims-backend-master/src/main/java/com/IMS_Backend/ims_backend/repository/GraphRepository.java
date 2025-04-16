package com.IMS_Backend.ims_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS_Backend.ims_backend.model.Graph;

public interface GraphRepository  extends JpaRepository<Graph, Long> {
	List<Graph> findByCompany(String company);
}

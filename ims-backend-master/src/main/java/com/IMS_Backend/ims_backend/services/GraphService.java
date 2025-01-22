package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Graph;

public interface GraphService {

	Graph createGraph(Graph graph);
	 
	 List<Graph> getAllGraphs();
	 
	 Graph updateGraph(Long id, Graph Employee);
	 
	 List<Graph> findByCompany(String company);
}

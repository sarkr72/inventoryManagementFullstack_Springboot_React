package com.IMS_Backend.ims_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IMS_Backend.ims_backend.model.Graph;
import com.IMS_Backend.ims_backend.model.ProductLocation;
import com.IMS_Backend.ims_backend.servicesImplementations.GraphImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/graph")
public class GraphController {

	@Autowired
	private GraphImpl graphService;
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PostMapping
	public ResponseEntity<Graph> createG(@RequestBody Graph graph) {
		Graph savedcompany = graphService.createGraph(graph);
		return new ResponseEntity<>(savedcompany, HttpStatus.CREATED);
	}
	
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping
	public ResponseEntity<List<Graph>> getAllGraphss() {
		List<Graph> graphs = graphService.getAllGraphs();

		return ResponseEntity.ok(graphs);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PutMapping("/{id}")
	public ResponseEntity<Graph> updatecompany(@PathVariable("id") Long id,
			@RequestBody Graph graph) {
		Graph updatedGraph = graphService.updateGraph(id, graph);

		return new ResponseEntity<>(updatedGraph, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/{company}")
	public ResponseEntity<List<Graph>> getcompany(@PathVariable("company") String company) {
		List<Graph> graphs = graphService.findByCompany(company);

		return ResponseEntity.ok(graphs);
	}
	
}

package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Graph;
import com.IMS_Backend.ims_backend.repository.GraphRepository;
import com.IMS_Backend.ims_backend.services.GraphService;

@Service
public class GraphImpl implements GraphService{
	
	@Autowired
	private GraphRepository graphRepo;
	
	@Override
	public Graph createGraph(Graph graph) {
		return graphRepo.save(graph);
	}

	@Override
	public List<Graph> getAllGraphs() {
		return graphRepo.findAll();
	}

	@Override
	public Graph updateGraph(Long id, Graph newGraph) {
		Graph existingGraph = graphRepo.findById(id).orElseThrow(() -> new NotFoundException("does not exist ")); // Example method to retrieve the graph

        if (existingGraph != null) {
            existingGraph.setDate(newGraph.getDate());
            existingGraph.setPrice(newGraph.getPrice());
            existingGraph.setQuantity(newGraph.getQuantity());
            existingGraph.setCompany(newGraph.getCompany());
            existingGraph.setPo(newGraph.getPo());
            existingGraph.setPl(newGraph.getPl());

            graphRepo.save(existingGraph); 
        }
        return existingGraph;
	}

	@Override
	public List<Graph> findByCompany(String company) {
		return graphRepo.findByCompany(company);
	}

}

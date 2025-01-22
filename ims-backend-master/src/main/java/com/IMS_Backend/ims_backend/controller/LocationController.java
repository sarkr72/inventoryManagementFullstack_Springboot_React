package com.IMS_Backend.ims_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IMS_Backend.ims_backend.model.Location;
import com.IMS_Backend.ims_backend.services.LocationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/location")
public class LocationController {

	@Autowired
	private LocationService locationService;
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location){
        Location savedLocation = locationService.createLocation(location);
        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping("/{id}")
	public ResponseEntity<Location> getLocation(@PathVariable("id") Long id){
		Location location = locationService.getLocationById(id);
		
		return new ResponseEntity<>(location, HttpStatus.CREATED);
	}

	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@GetMapping
	public ResponseEntity<List<Location>> getAllLocations(){
		List<Location> locations = locationService.getAllLocations();
		
		return ResponseEntity.ok(locations);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@PutMapping("/{id}")
	public ResponseEntity<Location> updateLocation(@PathVariable("id") Long id, @RequestBody Location location){
		Location updatedLocation = locationService.updateLocation(id, location);
		
		return new ResponseEntity<>(updatedLocation, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'EMPLOYEE')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteLocation(@PathVariable("id") Long id){
		locationService.deleteLocationById(id);
		
		return ResponseEntity.ok("Location deleted successfully");
	}
}

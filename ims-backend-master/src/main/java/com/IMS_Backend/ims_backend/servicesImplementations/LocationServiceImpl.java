package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Location;
import com.IMS_Backend.ims_backend.repository.LocationRepository;
import com.IMS_Backend.ims_backend.services.LocationService;

@Service
public class LocationServiceImpl implements LocationService{
	
	@Autowired
	private LocationRepository locationRepository;
	
	@Override
	public Location createLocation(Location location) {
		Location savedLocation = locationRepository.save(location);
		return savedLocation;
	}

	@Override
	public Location getLocationById(Long locationId) {
		Location location = locationRepository.findById(locationId).orElseThrow(()-> new NotFoundException("Location is not found with id: " + locationId));
		return location;
	}

	@Override
	public List<Location> getAllLocations() {
		return locationRepository.findAll();
	}

	@Override
	public Location updateLocation(Long locationId, Location location) {
		Location savedLocation = locationRepository.findById(locationId).orElseThrow(()-> new NotFoundException("Location is not found with id: " + locationId));
		savedLocation.setRow(location.getRow());
		savedLocation.setCol(location.getCol());
		savedLocation.setEmpty(location.isEmpty());
		savedLocation.setWarehouse(location.getWarehouse());   
		savedLocation.setMaxCapacity(location.getMaxCapacity());
		savedLocation.setStock(location.getStock());
		savedLocation.setAvailable(location.getAvailable());
		
//		if (location.getProductLocations() != null) {
//			savedLocation.getProductLocations().addAll(location.getProductLocations());
//		}
		
		Location updatedLocation = locationRepository.save(savedLocation);
		
		return updatedLocation;
	}

	@Override
	public void deleteLocationById(Long locationId) {
		Location savedLocation = locationRepository.findById(locationId).orElseThrow(()-> new NotFoundException("Location is not found with id: " + locationId));
		locationRepository.delete(savedLocation);
		
	}

}

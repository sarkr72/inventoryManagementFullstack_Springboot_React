package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Location;

public interface LocationService {
	Location createLocation(Location location);
	
	Location getLocationById(Long locationId);
	
 	List<Location> getAllLocations();

    Location updateLocation(Long locationId, Location location);

    void deleteLocationById(Long locationId);
}

package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.ProductLocation;
import com.IMS_Backend.ims_backend.repository.ProductLocationRepository;
import com.IMS_Backend.ims_backend.services.ProductLocationService;

@Service
public class ProductLocationServiceImpl implements ProductLocationService{

	@Autowired
	private ProductLocationRepository productLocationRepository;
	
	@Override
	public ProductLocation createProductLocaiton(ProductLocation productLocation) {
		ProductLocation savedLocation = productLocationRepository.save(productLocation);
		return savedLocation;
	}

	@Override
	public ProductLocation getProductLocationById(Long id) {
		ProductLocation location = productLocationRepository.findById(id).orElseThrow(()-> new NotFoundException("Location is not found with id: " + id));
		return location;
	}

	@Override
	public List<ProductLocation> getAllProductLocations() {
		return productLocationRepository.findAll();
	}

	@Override
	public ProductLocation updateProductLocation(Long productId, ProductLocation productLocation) {
		ProductLocation savedLocation = productLocationRepository.findById(productId).orElseThrow(()-> new NotFoundException("Location is not found with id: " + productId));
		savedLocation.setProduct(productLocation.getProduct());
		savedLocation.setLocation(productLocation.getLocation());
		savedLocation.setBatchNumber(productLocation.getBatchNumber());
		savedLocation.setUnitPrice(productLocation.getUnitPrice());
		savedLocation.setTotalprice(productLocation.getTotalprice());
		savedLocation.setSupplier(productLocation.getSupplier());
		savedLocation.setReceivedDate(productLocation.getReceivedDate());
		savedLocation.setMfgDate(productLocation.getMfgDate());
		savedLocation.setExpDate(productLocation.getExpDate());
		savedLocation.setQuantity(productLocation.getQuantity());
		savedLocation.setPo(productLocation.getPo());
		savedLocation.setCompany(productLocation.getCompany());
		
		
		ProductLocation updatedLocation = productLocationRepository.save(savedLocation);
		
		return updatedLocation;
	}

	@Override
	public void deleteProductLocationById(Long id) {
		ProductLocation productLocation = productLocationRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Company is not found with id: " + id));
		productLocationRepository.delete(productLocation);
	}

		@Override
		public List<ProductLocation> getProductLocationsByLocation(int row, int col, String wh, String company) {
		    String rowColPattern = String.format("Row: %s Col: %s %s%%", row, col, wh);
		    return productLocationRepository.findByRowColWhAndCompany(rowColPattern, company);
		}

		@Override
		public List<ProductLocation> getProductLocationsByProduct(String product, String company) {
			return productLocationRepository.findByProductNameAndCompany(product, company);
		}

		@Override
		public List<ProductLocation> getByCompany(String company) {
			return productLocationRepository.findByCompany(company);
		}

}

package com.IMS_Backend.ims_backend.servicesImplementations;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Company;
import com.IMS_Backend.ims_backend.model.Product;
import com.IMS_Backend.ims_backend.repository.CompanyRepository;
import com.IMS_Backend.ims_backend.repository.ProductRepository;
import com.IMS_Backend.ims_backend.services.ProductService;



@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CompanyRepository companyRepo;
	
	@Override
	public Product createProduct(Product product) {
		List<Product> products = productRepository.findByCompanyId(product.getCompany().getId());
		 for (Product existingProduct : products) {
		        if (existingProduct.getName().equalsIgnoreCase(product.getName())) {
		        	throw new NotFoundException( "Product already exists!");
		        }
		    }
		Product createdProduct = productRepository.save(product);
        return createdProduct;
	}

	@Override
	public Product getProductById(Long productId) {
		Product product = productRepository.findById(productId).orElseThrow(()-> new NotFoundException("Product not found through ID: " + productId));
		return product;
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product updateProduct(Long productId, Product product) {
		Product searchedProduct = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Product not found through ID: " + productId));
		searchedProduct.setName(product.getName());
		searchedProduct.setCategory(product.getCategory());
		searchedProduct.setRestockLevel(product.getRestockLevel());
		searchedProduct.setUnitPrice(product.getUnitPrice());
		searchedProduct.setQuantity(product.getQuantity());
		Product updatedProduct = productRepository.save(searchedProduct);
		
		return updatedProduct;
	}

	@Override
	public void deleteProductById(Long productId) {
		Product deleteProduct = productRepository.findById(productId).orElseThrow(()-> new NotFoundException("Product not found through ID: " + productId));
		productRepository.delete(deleteProduct);
		
	}
	
	@Override
	public List<Product> getProductsByCompanyId(Long companyId) {
        return productRepository.findByCompanyId(companyId);
    }

	@Override
	public Product getProductByName(String name) {
		 return productRepository.findProductByName(name).orElseThrow(()-> new NotFoundException("Product not found through name: " + name));
	}

	@Override
	public Product updateProductByName(String name, Product product) {
		Product p = getProductByName(name);
		p.setQuantity(product.getQuantity());
		p.setUnitPrice(product.getUnitPrice());
		
		return p;
	}

    
}

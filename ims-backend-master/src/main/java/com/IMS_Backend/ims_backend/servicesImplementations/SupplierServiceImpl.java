package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Company;
import com.IMS_Backend.ims_backend.model.Supplier;
import com.IMS_Backend.ims_backend.repository.CompanyRepository;
import com.IMS_Backend.ims_backend.repository.SupplierRepository;
import com.IMS_Backend.ims_backend.services.SupplierService;

@Service
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	private SupplierRepository supplierRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@Override
	public Supplier createSupplier(Supplier supplier) {
		if (supplier.getCompanies() != null) {
			Set<Long> companyIds = supplier.getCompanies().stream().map(Company::getId).collect(Collectors.toSet());
			List<Company> companies = companyRepository.findAllById(companyIds);
			for (Company companyInput : companies) {
				if (companyInput.getId() != null) {
					Company existingComp = companyRepository.findById(companyInput.getId())
							.orElseThrow(() -> new NotFoundException("Company is not found with id: "));
					supplier.addCompany(existingComp);
				}
			}

			supplier.setCompanies(companies);
		}

		Supplier savedSupplier = supplierRepository.save(supplier);

		return savedSupplier;
	}

	@Override
	public Supplier getSupplierById(Long supplierId) {
		Supplier supplier = supplierRepository.findById(supplierId)
				.orElseThrow(() -> new NotFoundException("Supplier is not found with id: " + supplierId));
		return supplier;
	}

	@Override
	public Supplier getSupplierByName(String name) {
		Supplier supplier = supplierRepository.findSupplierByName(name)
				.orElseThrow(() -> new NotFoundException("Supplier is not found with id: " + name));
		return supplier;
	}
	
	@Override
	public List<Supplier> getAllSuppliers() {
		return supplierRepository.findAll();
	}

	@Override
	public Supplier updateSupplier(Long supplierId, Supplier supplier) {
		Supplier savedSupplier = supplierRepository.findById(supplierId)
				.orElseThrow(() -> new NotFoundException("Supplier is not found with id: " + supplierId));
		savedSupplier.setName(supplier.getName());
		savedSupplier.setAddress(supplier.getAddress());
		savedSupplier.setContact(supplier.getContact());
//		if (supplier.getCompanies() != null) {
//			savedSupplier.getCompanies().addAll(supplier.getCompanies());
//		}
		List<Company> companies = supplier.getCompanies();
		for (Company companyInput : companies) {
			if (companyInput.getId() != null) {
				Company existingComp = companyRepository.findById(companyInput.getId())
						.orElseThrow(() -> new NotFoundException("Company is not found with id: " + supplierId));
				savedSupplier.addCompany(existingComp);
			}
		}
//		if (supplier.getPos() != null) {
//			savedSupplier.getPos().addAll(supplier.getPos());
//		}
		Supplier updatedSupplier = supplierRepository.save(savedSupplier);

		return updatedSupplier;

	}

	@Override
	public void deleteSupplierById(Long supplierId) {
	    Supplier savedSupplier = supplierRepository.findById(supplierId)
	            .orElseThrow(() -> new NotFoundException("Supplier is not found with id: " + supplierId));

	    List<Company> companies = savedSupplier.getCompanies();

	    if (companies != null) {
	        for (Company company : new ArrayList<>(companies)) {
	            company.removeSupplier(savedSupplier); 
	            savedSupplier.removeCompany(company); 
	        }
	    }
	    supplierRepository.delete(savedSupplier);
	}

	@Override
	public List<Supplier> getSuppliersByCompanyId(Long id) {
		return supplierRepository.findByCompanyId(id);
	}

}

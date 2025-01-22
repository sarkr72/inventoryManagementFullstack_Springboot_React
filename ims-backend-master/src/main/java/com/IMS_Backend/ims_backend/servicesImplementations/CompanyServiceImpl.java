package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Company;
import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.model.Supplier;
import com.IMS_Backend.ims_backend.model.Warehouse;
import com.IMS_Backend.ims_backend.repository.CompanyRepository;
import com.IMS_Backend.ims_backend.repository.EmployeeRepository;
import com.IMS_Backend.ims_backend.repository.SupplierRepository;
import com.IMS_Backend.ims_backend.repository.WarehouseRepository;
import com.IMS_Backend.ims_backend.services.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
	private SupplierRepository supplierRepository;
	
	@Autowired
	private EmployeeRepository empRepo;
	
	@Autowired
	private WarehouseRepository wRepo;
	
	@Override
	public Company createCompany(Company company) {
//		if (company.getSuppliers() != null) {
//			Set<Long> ids = company.getSuppliers().stream().map(Supplier::getId).collect(Collectors.toSet());
//			List<Supplier> suppliers = supplierRepository.findAllById(ids).stream().collect(Collectors.toSet());
//			
//			company.setSuppliers(suppliers);
//		}


		
		Company savedCompany = companyRepository.save(company);
		return savedCompany;
	}

	@Override
	public Company getCompanyById(Long companyId) {
		Company Company = companyRepository.findById(companyId)
				.orElseThrow(() -> new NotFoundException("Company is not found with id: " + companyId));
		return Company;
	}

	@Override
	public List<Company> getAllCompanys() {

		return companyRepository.findAll();
	}

	@Override
	public Company updateCompany(Long companyId, Company company) {
		Company savedCompany = companyRepository.findById(companyId)
				.orElseThrow(() -> new NotFoundException("Company is not found with id: " + companyId));

		savedCompany.setName(company.getName());
		savedCompany.setAddress(company.getAddress());
		savedCompany.setContact(company.getContact());
		if (company.getSuppliers() != null) {
//			savedCompany.getSuppliers().addAll(company.getSuppliers());
			List<Supplier> suppliers = company.getSuppliers();
			for(Supplier supplierInput : suppliers) {
				if(supplierInput.getId() != null) {
					Supplier existingSup = supplierRepository.findById(supplierInput.getId()).orElseThrow(() -> new NotFoundException("Company is not found with id: " + companyId));
					savedCompany.addSupplier(existingSup);
				}
			}
		}
		
		if (company.getEmployees() != null) {
			Set<Long> ids = company.getEmployees().stream().map(Employee::getId).collect(Collectors.toSet());
			Set<Employee> employees = empRepo.findAllById(ids).stream().collect(Collectors.toSet());
			for(Employee e: employees) {
				savedCompany.addEmployee(e);
			}
		}
		
		
		if (company.getWarehouses() != null) {
			List<Warehouse> wars = company.getWarehouses();
			for(Warehouse w : wars) {
				if(w.getId() != null) {
					Warehouse existingSup = wRepo.findById(w.getId()).orElseThrow(() -> new NotFoundException("Company is not found with id: " + companyId));
					savedCompany.addWarehouse(existingSup);
				}
			}
		}

		Company updatedCompany = companyRepository.save(savedCompany);

		return updatedCompany;
	}

	@Override
	public void deleteCompanyById(Long companyId) {
		Company savedCompany = companyRepository.findById(companyId)
				.orElseThrow(() -> new NotFoundException("Company is not found with id: " + companyId));
		companyRepository.delete(savedCompany);

	}

	@Override
	public List<Supplier> getSuppliersByCompany(Long id) {
		List<Long> ids =  companyRepository.findSupplierIdsByCompanyId(id);
		List<Supplier> list = supplierRepository.findAllById(ids);
		return list;
	}

}

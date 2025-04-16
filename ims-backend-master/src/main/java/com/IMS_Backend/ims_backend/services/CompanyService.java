package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Company;
import com.IMS_Backend.ims_backend.model.Supplier;

public interface CompanyService {

    Company createCompany(Company company);

    Company getCompanyById(Long companyId);

    List<Company> getAllCompanys();

    List<Supplier> getSuppliersByCompany(Long id);
    
    Company updateCompany(Long companyId, Company company);

    void deleteCompanyById(Long companyId);
}

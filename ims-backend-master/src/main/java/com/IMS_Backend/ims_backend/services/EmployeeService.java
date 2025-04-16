package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Employee;

public interface EmployeeService {
    Employee createEmployee(Employee Employee);

    Employee getEmployeeById(Long employeeId);

    Employee findByEmail(String email);
    
    List<Employee> getAllEmployees();

    Employee updateEmployee(Long employeeId, Employee Employee);

    void deleteEmployeeById(Long employeeId);
    
}

import API from "./Api";

const REST_API_BASE_URL = '/employees';

export const getEmployeeByAuth = (username, password) => API.get(REST_API_BASE_URL + '/' + username, password)

export const listEmployees = () => API.get(REST_API_BASE_URL);

export const createEmployee = (employee) => API.post(REST_API_BASE_URL, employee);

export const getRoles = ()=> API.get(REST_API_BASE_URL + "/roles");

export const getEmployee = (employeeEmail) => API.get(REST_API_BASE_URL + '/' + employeeEmail);

export const updateEmployee = (employeeId, employee) => API.put(REST_API_BASE_URL + '/' + employeeId, employee);

export const deleteEmployee =(employeeId) => API.delete(REST_API_BASE_URL + '/' + employeeId);



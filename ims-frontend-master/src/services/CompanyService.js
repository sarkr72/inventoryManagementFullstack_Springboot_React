import axios from "axios";
import { getToken } from "./AuthService";

const REST_API_BASE_URL = 'http://localhost:8080/api/companies';

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();

    return config;
}, function (error){
    return Promise.reject(error);
});

export const listCompanies = () => axios.get(REST_API_BASE_URL);

export const listSuppliersById = (id) => axios.get(REST_API_BASE_URL + "/companySuppliers/" + id);

export const createCompany = (company) => axios.post(REST_API_BASE_URL, company);

export const getCompany = (CompanyId) => axios.get(REST_API_BASE_URL + '/' + CompanyId);

export const updateCompanyWithId = (CompanyId, company) => axios.put(REST_API_BASE_URL + '/' + CompanyId, company);

export const deleteCompany =(CompanyId) => axios.delete(REST_API_BASE_URL + '/' + CompanyId);



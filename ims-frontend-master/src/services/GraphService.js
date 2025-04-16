import API from './Api'

const REST_API_BASE_URL = '/graph';


export const listGraphs = () => API.get(REST_API_BASE_URL);

export const listGraphsByCompany = (company) => API.get(REST_API_BASE_URL + "/" + company);

export const createGraph = (graph) => API.post(REST_API_BASE_URL, graph);

export const updateGraph = (id, graph) => API.put(REST_API_BASE_URL + '/' + id, graph);


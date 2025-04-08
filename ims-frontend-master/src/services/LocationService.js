import API from './Api'

const REST_API_BASE_URL = "/location";

export const listLocations = () => API.get(REST_API_BASE_URL);

export const createLocation = (location) =>
  API.post(REST_API_BASE_URL, location);

export const getLocation = (locationId) =>
  API.get(REST_API_BASE_URL + "/" + locationId);

export const updateLocation = (locationId, location) => API.put(REST_API_BASE_URL + "/" + locationId, location);

export const deleteLocation = (locationId) =>
  API.delete(REST_API_BASE_URL + "/" + locationId);

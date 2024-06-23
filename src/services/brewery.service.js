import axios from "axios";
const breweriesHost = "https://api.openbrewerydb.org/v1/breweries";
const axiosInstance = axios.create({
  baseURL: breweriesHost,
});

const getBreweries = async (pageSize, currentPage) => {
  const response = await axiosInstance.get(
    `/?per_page=${pageSize}&page=${currentPage}`
  );
  return response;
};

const getBreweryById = async (id) => {
  const response = await axiosInstance.get(`/${id}`);
  return response;
};

const searchBreweries = async (query) => {
  const response = await axiosInstance.get(encodeURI(`/search?query=${query}`));
  return response;
};

const getMetadata = async () => {
  const response = await axiosInstance.get("/meta");
  return response;
};
export { getBreweries, getBreweryById, searchBreweries, getMetadata };

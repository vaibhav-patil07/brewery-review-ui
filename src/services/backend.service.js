import axios from "axios";
const local = "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: local,
});

const login = async (email, password) => {
  const response = await axiosInstance.post("login", {
    email: email,
    password: password,
  });
  return response;
};

const getBreweryRatingsById = async (id) => {
  const response = await axiosInstance.get(`/brewery/${id}`);
  return response;
};

export { login, getBreweryRatingsById };

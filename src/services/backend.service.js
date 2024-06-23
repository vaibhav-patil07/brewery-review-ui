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

const signup = async (name, email, password) => {
  const response = await axiosInstance.post("signup", {
    name: name,
    email: email,
    password: password,
  });
  return response;
};
const getBreweryRatingsById = async (id) => {
  const response = await axiosInstance.get(`/brewery/${id}/ratings`);
  return response;
};

const getBreweryRatingsByUser = async (id, token) => {
  const response = await axiosInstance.get(`/users/brewery/${id}/ratings`, {
    headers: {
      token: token,
    },
  });
  return response;
};

const saveRatings = async (id, token, ratings, description) => {
  const response = await axiosInstance.put(
    `/brewery/${id}/ratings`,
    {
      id: id,
      ratings: ratings,
      description: description,
    },
    {
      headers: {
        token: token,
      },
    }
  );
  return response;
};

export {
  login,
  getBreweryRatingsById,
  saveRatings,
  getBreweryRatingsByUser,
  signup,
};

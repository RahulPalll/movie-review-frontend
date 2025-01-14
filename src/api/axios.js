import axios from "axios";

const API = axios.create({
  baseURL: "https://movie-review-backend-xis7.onrender.com",
});

export default API;

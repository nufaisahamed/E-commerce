import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-gexl.onrender.com", // your backend URL
  withCredentials: true, // This is necessary to send cookies with requests
});

export default axiosInstance;

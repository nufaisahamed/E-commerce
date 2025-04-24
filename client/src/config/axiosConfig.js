import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // your backend URL
  withCredentials: true, // This is necessary to send cookies with requests
});

export default axiosInstance;

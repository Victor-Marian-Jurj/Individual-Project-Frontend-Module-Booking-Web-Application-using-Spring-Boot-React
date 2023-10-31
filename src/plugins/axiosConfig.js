import axios from "axios";

const username = "victor";
const password = "111";
const basicAuth = "Basic " + btoa(username + ":" + password);

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: basicAuth,
  },
});

export default axiosInstance;

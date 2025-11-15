import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3001",
  timeout: 10000,
});

const authServiceAxiosInstance = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL || "http://localhost:3000",
  timeout: 10000,
});

export { axiosInstance, authServiceAxiosInstance };

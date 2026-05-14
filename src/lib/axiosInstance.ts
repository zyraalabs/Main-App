import axios from "axios";
import { AUTH_SERVICE_URL, CLI_BACKEND_URL } from "./env";

export const axiosInstance = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export const authServiceAxiosInstance = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 10000,
});

export const cliBackendAxiosInstance = axios.create({
  baseURL: CLI_BACKEND_URL,
  timeout: 10000,
});

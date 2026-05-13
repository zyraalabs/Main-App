import axios from "axios";
import { APP_URL, AUTH_SERVICE_URL } from "./env";

const CLI_BACKEND_URL = process.env.CLI_BACKEND_URL ?? "http://localhost:4000";

const axiosInstance = axios.create({ baseURL: APP_URL, timeout: 10000 });

const authServiceAxiosInstance = axios.create({
  baseURL: AUTH_SERVICE_URL,
  timeout: 10000,
});

const cliBackendAxiosInstance = axios.create({
  baseURL: CLI_BACKEND_URL,
  timeout: 10000,
});

export { axiosInstance, authServiceAxiosInstance, cliBackendAxiosInstance };

import axios, { AxiosError } from "axios";
import { config } from "./config";
import { ApiErrorResponse } from "@/types/api";

export interface ApiError {
  message: any;
  status: number;
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: config.apiTimeout,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const apiError: ApiError = {
      message:
        error.response?.data?.message ||
        error.response?.data?.error ||
        "An error occurred",
      status: error.response?.status || 500,
    };
    return Promise.reject(apiError);
  }
);

export default api;

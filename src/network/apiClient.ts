import { cleanNotifications, showNotification } from "@mantine/notifications";
import axios, { HttpStatusCode, InternalAxiosRequestConfig } from "axios";

export const BASE_URL = "http://0.0.0.0:3000/api/";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    config.headers["Content-Type"] = "application/json";

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  function (error) {
    Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error?.response?.status === HttpStatusCode.Unauthorized ||
      error?.response?.status === HttpStatusCode.Forbidden
    ) {
      localStorage.clear();
      cleanNotifications();
      showNotification({
        color: "red",
        title: "Session Expired",
        message:
          "Your current session expired. Login Again to start your new session.",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
    return Promise.reject(error);
  },
);

export default apiClient;

import axiosInstance from "./axios";

export const authApi = {
  register: (userData) => axiosInstance.post("/register", userData),
  login: (credentials) => axiosInstance.post("/login", credentials),
  refresh: () => axiosInstance.get("/auth/refresh"),
  logout: () => axiosInstance.post("/auth/logout"),
};

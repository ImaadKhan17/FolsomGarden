import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshToken, storeTokens } from "./tokenAuthHandling";
import API_URL from "@/constants/apiurl";



const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = await AsyncStorage.getItem("refreshToken");
      if (refresh) {
        try {
          const { access } = await refreshToken(refresh);
          await storeTokens(access, refresh);
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Handle token refresh failure (e.g., log out the user)
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

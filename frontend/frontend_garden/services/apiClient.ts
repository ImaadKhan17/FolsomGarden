import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout, refreshToken, storeTokens } from "./tokenAuthHandling";
import {API_URL} from "@/constants/apiurl";



const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("apiClient trying to request using: ",accessToken);
    
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
      console.log("Retrying request due to 401 error.");

      const refresh = await AsyncStorage.getItem("refreshToken");
      console.log("Refresh token for retry with refresh token:", refresh);

      if (refresh) {
        try {
          const { access, refresh: newRefresh } = await refreshToken(refresh);
           // Update stored tokens
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          logout()
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

import axios from "axios";
import {API_URL} from "../constants/apiurl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/token/`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessages = error.response.data;
      const formattedErrors = Object.values(errorMessages).flat().join("\n");
      return { error: formattedErrors };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};

export const signup = async (username:string, email:string, password:string, location) => {
  try {
    console.log(location);
    
    const response = await axios.post(`${API_URL}/signup/`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      const errorMessages = error.response.data;
      const formattedErrors = Object.values(errorMessages).flat().join("\n");
      return { error: formattedErrors };
    } else {
      return { error: "An unexpected error occurred." };
    }
  }
};

export const refreshToken = async (refreshToken:string) => {
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    console.log("Token refresh response:", response.data);

    const { access, refresh: newRefresh } = response.data;
    await storeTokens(access, newRefresh);
    return response.data; // { access, refresh }
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

export const storeTokens = async (accessToken: string, refreshToken:string) => {
  try {
    if (!accessToken || !refreshToken) {
      throw new Error("Tokens must not be undefined or null.");
    }
    console.log("Storing access token:", accessToken);
    await AsyncStorage.setItem("accessToken", accessToken);
    console.log("Access token stored.");
    console.log("Storing refresh token:", refreshToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    console.log("Refresh token stored.");
  } catch (err) {
    console.error("Error storing tokens:", err);
    throw err;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    console.log("Retrieved access token:", accessToken);
    return accessToken;
  } catch (err) {
    console.error("Error fetching access token:", err);
    throw err;
  }
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log("Retrieved refresh token:", refreshToken);
    return refreshToken;
  } catch (err) {
    console.error("Error fetching refresh token:", err);
    throw err;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    router.replace('/')
  } catch (err) {
    throw err;
  }
};

export const checkAsyncStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);

    // Format the results
    const result = items.map(([key, value]) => ({ key, value }));
    console.log(result);
  } catch (error) {
    console.error("Error fetching AsyncStorage data:", error);
  }
};

// Call the function to see the content

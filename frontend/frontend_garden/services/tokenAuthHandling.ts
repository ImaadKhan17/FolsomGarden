import axios from "axios";
import API_URL from "../constants/apiurl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (
  username: string,
  password: string
) => {
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

export const signup = async (username, email, password) => {
  try {
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

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data; // { access }
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};

export const storeTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  } catch (err) {
    console.error("Error storing token: ", err);
    throw err;
  }
};

export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken !== null) {
      return accessToken;
    }
  } catch (err) {
    console.error("Error storing token: ", err);
    throw err;
  }
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (refreshToken !== null) {
      return refreshToken;
    }
  } catch (err) {
    console.error("Error storing token: ", err);
    throw err;
  }
};

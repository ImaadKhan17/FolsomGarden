import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";

const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    console.log(response.data); // Log the data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Home = () => {
  const [data, setData] = useState(null); // State to hold fetched data

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData("user/data/"); // Call fetchData
        setData(result); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadData(); // Invoke the loadData function
  }, []); // Empty dependency array to run once on mount

  return (
    <View>
      {data ? (
        <>
          <Text>Username: {data.username}</Text>
          <Text>Email: {data.email}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Home;

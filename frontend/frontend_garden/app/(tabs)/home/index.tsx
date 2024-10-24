import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import apiClient from "@/services/apiClient";
import CustomButton from "@/components/CustomButton";
import { logout } from "@/services/tokenAuthHandling";
import Item from "@/components/Item";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import SearchInput from "@/components/SearchInput";
import { fetchData } from "@/services/api_services";


const Home = () => {
  const [userdata, setUserData] = useState(null); // State to hold fetched data
  const [itemData, setItemData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const result = await fetchData("user/data/"); // Call fetchData
      const data_item = await fetchData("items/");
      setItemData(data_item);
      setUserData(result); // Set the fetched data to state
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchData("user/data/"); // Call fetchData
        const data_item = await fetchData("items/");
        
        setItemData(data_item);
        setUserData(result); // Set the fetched data to state
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadData(); // Invoke the loadData function
  }, []); // Empty dependency array to run once on mount
  if (userdata == null || itemData == null) {
    return (
      <SafeAreaView className="bg-primary h-full p-6">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        className="w-full h-full p-6"
        data={itemData}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.name}
            image={item.image}
            price={item.price}
            unit={item.unit}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="font-pmedium text-lg text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-3xl font-psemibold text-white">
                  {userdata.username}
                </Text>
                <Text>Your Location is </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

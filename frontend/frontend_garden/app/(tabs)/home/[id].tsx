import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { API_URL, MAIN_URL } from "@/constants/apiurl";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { images } from "@/constants";
import {
  get_category,
  get_user_from_id,
  unit_check,
} from "@/services/api_services";
import RelItem from "@/components/RelItem";
import CustomButton from "@/components/CustomButton";
const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const [itemDetail, setItemDetail] = useState({});
  const [relItems, setRelItems] = useState([]);
  const [sellerData, setSellerData] = useState({});
  const [itemImage, setItemImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load_data = async () => {
      const response = await axios.get(`${API_URL}/items/${id}/`);
      const seller_data = await get_user_from_id(response.data[0].created_by);
      setItemDetail(response.data[0]);
      setRelItems(response.data[1]);
      setSellerData(seller_data);
      setItemImage(`${MAIN_URL}${response.data[0].image}`);
      setIsLoaded(true);
    };
    load_data();
  }, []);
  if (!isLoaded) {
    return (
      <SafeAreaView className="bg-primary h-full p-6">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View className="bg-primary">
        <View className="border-primary  rounded-2xl overflow-hidden h-[40vh] bg-white">
          <Image
            source={{ uri: itemImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>
      <View className="h-[57vh] bg-primary  bottom-10  w-full z-10 rounded-3xl overflow-hidden p-6">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-3">
            <View className="bg-[#ee4b4cED] p-[6px] rounded-lg self-start ">
              <Text className=" text-xs font-plight text-slate-200">
                {get_category(itemDetail.category)}
              </Text>
            </View>
            <View className="mt-3">
              <Text className="text-black-200 font-psemibold text-3xl">
                {itemDetail.name}
                <Text> by</Text>
                <Text className="text-secondary font-pregular">
                  {" "}
                  {sellerData.username}
                </Text>
              </Text>
              <Text className="text-xl font-pmedium text-secondary-100">
                $ {itemDetail.price}
                <Text className="text-black-200"> /</Text>
                <Text className="text-sm text-black-200">
                  {" "}
                  {itemDetail.unit}
                </Text>
              </Text>
            </View>
          </View>
          <View className="border-t-[1px] border-gray-200 mt-5 pt-6">
            <Text className="text-slate-100 text-[16px]">
              {itemDetail.description}
            </Text>
          </View>
          <CustomButton
            title="Buy now / Contact Seller"
            handlePress={() => {
              console.log("Implement the thing man");
              
            }}
            containerStyles="w-full mt-7"
            textStyles="text-white"
          />
          <View className="mt-4">
            <Text className="text-black-200 font-pmedium text-xl">
              Related Products
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              className="w-full "
              data={relItems}
              horizontal={true}
              renderItem={({ item }) => (
                <RelItem
                  id={item.id}
                  title={item.name}
                  image={item.image}
                  price={item.price}
                  unit={item.unit}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ItemDetail;

import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import { API_URL } from '@/constants/apiurl'
import Item from '@/components/Item'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'

const Search = () => {
  const {query} = useLocalSearchParams();
  const [itemData, setItemData] = useState([]);
  useEffect(()=>{
    const load_data = async () => {
      try{

        const response = await axios.get(`${API_URL}/items/search/`, {
          params: {
            query: query,
          },
        });
        setItemData(response.data)
        
      }catch(error){
        console.error(error)
        throw error
      }
      
    };
    load_data()
  },[query])
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
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6 ">
              <View>
                <Text className="font-pmedium text-lg text-gray-100">
                  Search Results
                </Text>
                <Text className="text-3xl font-psemibold text-white">
                  {query}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput initialQuery={query} />
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={
          <EmptyState
            title="No produce found :("
            subtitle="Please try again with another query"
          />
        }
      />
    </SafeAreaView>
  );
}

export default Search
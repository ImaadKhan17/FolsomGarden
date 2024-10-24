import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { MAIN_URL } from '@/constants/apiurl';
import React from 'react'
import { router } from 'expo-router';


const RelItem = ({ id, title, image, unit, price }) => {
  return (
    <View className="w-[50vw] mr-5 drop-shadow-lg">
      <TouchableWithoutFeedback onPress={()=>router.push(`/home/${id}`)}>
        <View className="flex-row bg-black-200 my-3 rounded-lg overflow-hidden">
          {/* Image Container */}
          <View className="w-20 h-20  bg-slate-200">
            <Image
              source={{ uri: `${MAIN_URL}${image}` }}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>

          {/* Info Container */}
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-semibold text-white  text-center">
              {title}
            </Text>
            <Text className="text-sm text-secondary-100 text-center">
              ${price} / {unit}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default RelItem
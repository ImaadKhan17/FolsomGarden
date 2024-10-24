import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { MAIN_URL } from '@/constants/apiurl'
import { router } from 'expo-router'
import { checkAsyncStorage, getAccessToken, getRefreshToken, logout } from '@/services/tokenAuthHandling'

const Item = ({id, title, image, unit, price}) => {
    console.log(image);
    
  return (
    
      <TouchableWithoutFeedback
      className='drop-shadow-xl'
        onPress={() => {
          // Redirect to the items info page
          router.push(`/home/${id}`);
        }}
      >
        <View className="w-[50%] my-3 border-2 border-[#106f70] mr-2 border-spacing-3 bg-black-100 rounded-xl overflow-hidden">
          {/* Image Container */}
          <View className="w-full h-[19vh]  bg-slate-200">
            <Image
              source={{ uri: `${MAIN_URL}${image}` }}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>

          {/* Info Container */}
          <View className="p-4">
            <Text className="text-lg font-semibold text-white mb-1 text-center">
              {title}
            </Text>
            <Text className="text-sm text-secondary-100 text-center">
              ${price} / {unit}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

  );
}

export default Item
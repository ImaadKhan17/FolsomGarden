import { Text, View, ScrollView, Image } from "react-native";
import { Link, Redirect, router} from "expo-router";
import React, { useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { getRefreshToken,storeTokens, refreshToken } from "@/services/tokenAuthHandling";


export default function Index() {
  const [isAuth, setisAuth] = useState(false)
  const [isCheckAuth, setisCheckAuth] = useState(true)
  useEffect(()=>{
    const checkAuthentication = async () => {
      try {
        console.log("HI");
        let oldToken = await getRefreshToken();
        if (oldToken) {
          console.log("This is old refreshToken: ", oldToken);
          let result = await refreshToken(oldToken);
          await storeTokens(result.access, result.refresh);
          if (result.access && result.refresh) {
            setisAuth(true);
          } else {
            setisAuth(false);
          }
        } else {
          setisAuth(false);
        }
      } catch (err) {
        throw err;
      } finally {
        setisCheckAuth(false);
      }
    };
    checkAuthentication();
  },[])
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full justify-start flex items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[400px] w-full h-[298px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl  text-white font-bold text-center">
              Buy Local Produce {"\n"} With {" "}
            <Text className="text-secondary-200 font-psemibold">Garden App</Text>
            </Text>
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            From backyard to table: Share your garden's bounty with neighbors!
          </Text>
          <CustomButton
            title="Continue"
            handlePress={() => {
              if(isAuth){
                console.log("Auth is true");
                
                router.push('/home')
              }else{
              router.push('/log-in')
              }
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

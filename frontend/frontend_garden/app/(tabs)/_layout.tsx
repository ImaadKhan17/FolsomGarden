import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect, Stack, useNavigation } from "expo-router";



import { icons } from "../../constants";


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
      source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-6 h-6"
       />
       <Text className={`${focused ? 'font-psemibold' :'font-pregular'} text-xs` } style={{color: color}}>{name}</Text>
    </View>
    
  );
};



const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#F13A4E",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#0b5d5e",
            borderTopWidth: 1,
            borderTopColor: "#106f70",
            height: 86,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="mt-3">
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="mt-3">
                <TabIcon
                  icon={icons.message}
                  color={color}
                  name="Chat"
                  focused={focused}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="mt-3">
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  name="Create"
                  focused={focused}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <View className="mt-3">
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

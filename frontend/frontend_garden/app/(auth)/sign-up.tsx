import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import { Link, router } from "expo-router";
import { signup } from "@/services/tokenAuthHandling";
import * as Location from "expo-location";
import CustomButton from "@/components/CustomButton";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const submit = async () => {
    if (form.username === "" || form.password === "" || form.email === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setIsSubmitting(true)

    try {
      let response = await signup(form.username, form.email, form.password, location.coords);
      if (response.error){
        Alert.alert("Oops", response.error)
      }else{
        router.replace("/log-in");
      } 
    } catch (err) {
      setError(String(err));
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }

  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[100px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/log-in"
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

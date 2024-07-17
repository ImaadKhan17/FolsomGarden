import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { useState } from "react";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import {
  storeTokens,
  getAccessToken,
  login,
  getRefreshToken,
} from "@/services/tokenAuthHandling";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const submit = async () => {
    if (form.username === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    if (form.username !== "" || form.password !== "") {
      setIsSubmitting(true);

      try {
        let response = await login(form.username, form.password);
        if (response.error) {
          Alert.alert("Oops", response.error);
        } else {
          setAccessToken(response.access);
          setRefreshToken(response.refresh);
          storeTokens(response.access, response.refresh);
          router.replace("/home");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
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
            Sign In
          </Text>
          <FormField
            title="Username"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Log In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

import { View, Text } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "@/services/tokenAuthHandling";

const Profile = () => {
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <CustomButton title="Log Out" handlePress={logout} />
    </SafeAreaView>
  );
};

export default Profile;

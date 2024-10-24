import { Stack } from "expo-router";
import Home from "."; // Import your Home screen
import ItemDetail from "./[id]"; // Import your ItemDetail screen

const HomeStack = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeStack;

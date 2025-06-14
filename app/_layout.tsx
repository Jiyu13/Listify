import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';

import {ClerkProvider, ClerkLoaded} from '@clerk/clerk-expo'
import {tokenCache} from "@/cache";
import {Context} from "@/components/Context";
import {List, ListItem} from "@/types/type";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [appUser, setAppUser] = useState(null)
  const [userLists, setUserLists] = useState<List[]>([])
  const [refreshing, setRefreshing] = useState(true)



  // ------------------------new fonts---------------------------------------
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "Barriecito-Regular": require("../assets/fonts/Barriecito-Regular.ttf"),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  if (!publishableKey) {
    throw new Error(
        'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env.development',
    )
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  const contextValue = {appUser, setAppUser, userLists, setUserLists, refreshing, setRefreshing}

  return (
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <Context.Provider value={contextValue}>
            <Stack screenOptions={{navigationBarColor: "white"}}>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(root)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="lists" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Context.Provider>

        </ClerkLoaded>
      </ClerkProvider>

  );
}

import { Stack } from 'expo-router';
import {StatusBar} from "expo-status-bar";

export default function Layout() {

    return (
      // @ts-ignore
      <>
          <StatusBar style='dark' />
          <Stack>
              <Stack.Screen name="welcome" options={{ headerShown: false }} />
              <Stack.Screen name="sign-up" options={{ headerShown: false }} />
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
              {/*<Stack.Screen name="sign-out" options={{ headerShown: false }} />*/}
          </Stack>
      </>

  );
}

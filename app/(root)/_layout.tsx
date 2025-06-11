import { Stack } from 'expo-router';
import {AppState, AppStateStatus, StatusBar} from "react-native";
import {useEffect} from "react";

export default function RootLayout() {
    useEffect(() => {
        const handleAppStateChange = (state: AppStateStatus) => {
            if (state === 'active') {
                StatusBar.setBackgroundColor('#FFCA3A');
                StatusBar.setBarStyle('dark-content');
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove(); // clean up
    }, []);
    return (
        // @ts-ignore
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#FFCA3A" translucent={false} />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>

    );
}


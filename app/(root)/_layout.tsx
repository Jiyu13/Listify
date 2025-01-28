import { Stack } from 'expo-router';
import {StatusBar} from "expo-status-bar";

export default function RootLayout() {
    return (
        // @ts-ignore
        <>
            <StatusBar style='dark' />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>

    );
}


import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Redirect} from "expo-router";

export default function Home() {
    return (
        // <SafeAreaView className="flex-1 items-center justify-center bg-white">
        //     <Text className="text-center">Home</Text>
        // </SafeAreaView>

        <Redirect href="./(auth)/welcome"/>
    )
}

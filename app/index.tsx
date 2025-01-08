import {View, Text, StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Redirect} from "expo-router";
import "../global.css"

export default function Home() {
    return (
        // <SafeAreaView>
        //     <StatusBar hidden={false} />
        //     <Redirect href="(auth)/welcome" />
        // </SafeAreaView>
        <Redirect href="./(auth)/welcome"/>
    )
}

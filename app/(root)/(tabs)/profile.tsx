import {SignedIn, SignedOut} from "@clerk/clerk-expo";
import {Text} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

export default function RootProfile() {
    return (
        <SafeAreaView>
            <Text>Profile</Text>
        </SafeAreaView>
    )
}

import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function SignIn() {
    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text className="text-center">Sign In</Text>
        </SafeAreaView>
    )
}

import {Image, Text, View} from "react-native";

import {icons} from "@/constants"
import FormButton from "@/components/buttons/FormButton";

export default function OAuth() {

    function handleGoogleSignIn() {
        return async () => {}
    }

    return (
        <View>
            <View className="flex flex-row justify-center items-center mt-4 gap-x-3 text-primary-900">
                <View className="flex-1 h-[1px] bg-general-100" />
                <Text className="text-1g">Or</Text>
                <View className="flex-1 h-[1px] bg-general-100" />
            </View>

            <FormButton
                buttonText="Login with Google"
                className="mt-6 w-full shadow-none text-primary-900"

                IconLeft={() => (
                    <Image
                        source={icons.google}
                        resizeMode="contain"
                        className="w-5 h-5 mx-2"
                    />
                )}
                bgVariant="outline"
                textVariant="primary"
                onPress={handleGoogleSignIn}
            />
        </View>

    )
}

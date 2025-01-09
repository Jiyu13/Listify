import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";

export default function SignIn() {

    const [formData, setFormData] = useState({email: "", password: ""})

    function handleInput(name:string, value:string) {
        // React Native <TextInput> doesn't not emit e.target.value
        // onChangeText provides the new value directly
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }

    function onSignInPress() {
        return
    }

    return (
        <SafeAreaView
            style={{backgroundColor: "#FFCA3A"}}
            className='flex h-full items-center justify-between'
        >
            {/*<View className="">*/}
                <View className="w-full h-[200px]">
                    <View>
                        <Text className="text-2xl text-black font-JakartaBold">
                            Sign In
                        </Text>
                    </View>

                    <View className="p-5">
                        <InputField
                            label="Email or username"
                            placeholder=''
                            name="email"
                            value={formData.email}
                            onChangeText={(text) => handleInput("email", text)}
                        />
                        <InputField
                            label="Password"
                            placeholder=''
                            name="password"
                            secureTextEntry={true}
                            value={formData.password}
                            onChangeText={(text) => handleInput("password", text)}
                        />
                        <CustomButton
                            title="Sign In"
                            onPress={onSignInPress}
                            className="mt-6 p-5"
                        />

                        <OAuth />


                        <Link
                            href="/sign-up"
                            className="text-lg text-center text-general-200 mt-10"
                        >
                            <Text className="text-primary-900">Don't have an account? </Text>
                            <Text className="text-primary-500">Sign Up</Text>
                        </Link>
                    </View>

                </View>
            {/*</View>*/}
        </SafeAreaView>
    )
}

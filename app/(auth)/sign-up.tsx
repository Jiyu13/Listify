import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import {useState} from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";

export default function SignIn() {

    const [formData, setFormData] = useState({email: "", username: "", password: ""})

    function handleInput(name:string, value:string) {
        // React Native <TextInput> doesn't not emit e.target.value
        // onChangeText provides the new value directly
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }

    function onSignUpPress() {
        return
    }

    return (
        <SafeAreaView style={{backgroundColor: "#FFCA3A"}} className='flex h-full items-center justify-between'>
            {/*<View className="">*/}
            <View className="w-full">
                <View>
                    <Text className="text-center text-2xl text-primary-900 font-JakartaBold">
                        Create Account
                    </Text>
                </View>

                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder=''
                        name="email"
                        value={formData.email}
                        onChangeText={(text) => handleInput("email", text)}
                    />
                    <InputField
                        label="Username"
                        placeholder=''
                        name="username"
                        value={formData.username}
                        onChangeText={(text) => handleInput("username", text)}
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
                        title="Create Account"
                        onPress={onSignUpPress}
                        className="mt-6 p-5"
                    />

                     <OAuth />


                    <Link
                        href="/sign-in"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        <Text className="text-primary-900">Already have an account? </Text>
                        <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>

                {/*    Verification Modal    */}

            </View>
            {/*</View>*/}
        </SafeAreaView>
)
}

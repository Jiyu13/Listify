import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import React, {useCallback, useContext, useState} from "react";
import {Link, useRouter} from "expo-router";
import OAuth from "@/components/OAuth";
import {useSignIn} from "@clerk/clerk-expo";
import api from "@/api";
import {Context} from "@/components/Context";
import FormButton from "@/components/buttons/FormButton";

export default function SignIn() {

    const {setAppUser} = useContext(Context)
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [formData, setFormData] = useState({email: "", password: ""})

    function handleInput(name:string, value:string) {
        // React Native <TextInput> doesn't not emit e.target.value
        // onChangeText provides the new value directly
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }


    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return


        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: formData.email.trim(),
                password: formData.password
            })


            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                // =============================== fetch user from database ================================
                try {
                    const response = await api.get(`/users/${formData.email}`)
                    setAppUser(response.data)
                    console.log("Signed In!")
                } catch (error) {
                    console.error("Failed to fetch user info.", error)
                }

                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/(root)/(tabs)/home')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, formData.email, formData.password])


    return (
        <SafeAreaView
            style={{backgroundColor: "#FFCA3A"}}
            className='flex h-full items-center justify-between'
        >
            {/*<View className="">*/}
                <View className="w-full mt-10">
                    <View>
                        <Text className="text-center text-2xl text-black text-primary-900 font-JakartaBold">
                            Sign In
                        </Text>
                    </View>

                    <View className="p-5">
                        <InputField
                            label="Email or username"
                            placeholder=''
                            value={formData.email}
                            onChangeText={(text) => handleInput("email", text)}
                        />
                        <InputField
                            label="Password"
                            placeholder=''
                            secureTextEntry={true}
                            value={formData.password}
                            onChangeText={(text) => handleInput("password", text)}
                        />
                        {/*<CustomButton*/}
                        {/*    title="Sign In"*/}
                        {/*    onPress={onSignInPress}*/}
                        {/*    className="mt-6 p-5"*/}
                        {/*/>*/}
                        <FormButton
                            buttonText='Sign In'
                            onPress={onSignInPress}
                            bgVariant='onboarding'
                            textVariant='onboarding'
                        />

                        <OAuth />


                        <Link
                            href="/sign-up"
                            className="text-lg text-center text-general-200 mt-10"
                        >
                            <Text className="text-customText-logo">Don't have an account? </Text>
                            <Text className="text-primary-500">Sign Up</Text>
                        </Link>
                    </View>

                </View>
            {/*</View>*/}
        </SafeAreaView>
    )
}

import {View, Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import {useCallback, useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link, router, useRouter} from "expo-router";
import OAuth from "@/components/OAuth";
import {useSignIn} from "@clerk/clerk-expo";

export default function SignIn() {

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
                identifier: formData.email,
                password: formData.password
            })


            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
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

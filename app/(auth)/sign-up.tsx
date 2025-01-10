import {View, Text, ScrollView, TextInput, Image, Alert} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import React, {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link, router, useRouter} from "expo-router";
import OAuth from "@/components/OAuth";
import {useSignUp} from "@clerk/clerk-expo";
import {ReactNativeModal} from "react-native-modal";
import {icons, images} from "@/constants";

export default function SignIn() {

    const { isLoaded, signUp, setActive } = useSignUp()

    // ==========================Verification - user login /signup by email==========================
    const [verification, setVerification] = useState({
        state: "default",  // default, using "success" / "pending" for testing
        error: "",
        code: ""
    })
    const [formData, setFormData] = useState({email: "", username: "", password: ""})
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    function handleInput(name:string, value:string) {
        // React Native <TextInput> doesn't not emit e.target.value
        // onChangeText provides the new value directly
        setFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }

    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress: formData.email.trim(),
                password: formData.password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form and capture OTP code
            setVerification((prevVerification) => ({...prevVerification, state: "pending"}))
        } catch (err: any) {
            // console.error(JSON.stringify(err, null, 2))
            Alert.alert("Error", err.errors[0].longMessage);
        }
    }

    // Handle submission of verification form
    // ==========================Email with code to verify whether it is us who trys to sign up with email==========================
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            // If verification was completed, set the session to active, and redirect the user
            if (signUpAttempt.status === 'complete') {
                // =======================create a new user once complete========================================
                // TODO: Create a database user!
                // ==============================================================================================

                await setActive({ session: signUpAttempt.createdSessionId })

                // =======================also modify the verification state=====================================
                setVerification((prevVerification) => ({...prevVerification, state: "success"}))
            } else {
                setVerification((prevVerification) => ({
                    ...prevVerification,
                    state: "failed", error: "Verification failed."
                }))
                // // If the status is not complete, check why. User may need to complete further steps.
                // console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err: any) {
            setVerification((prevVerification) => ({
                ...prevVerification,
                state: "failed", error: err.error[0].longMessage
            }))
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: "#FFCA3A"}} className='flex h-full items-center justify-between'>
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
                        value={formData.email}
                        onChangeText={(text) => handleInput("email", text)}
                    />
                    <InputField
                        label="Username"
                        placeholder=''
                        value={formData.username}
                        onChangeText={(text) => handleInput("username", text)}
                    />
                    <InputField
                        label="Password"
                        placeholder=''
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

                {/*========================  Verification Modal ========================*/}
                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    // onModalHide={() => setVerification({...verification, state: "success"})}
                    onModalHide={() => {
                        if (verification.state === "success") {
                        setShowSuccessModal(true);
                    }}}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">
                            Verification
                        </Text>
                        <Text className="font-Jakarta mb-5">
                            We've sent a verification code to {formData.email}
                        </Text>
                        <InputField
                            label="Code"
                            icon={icons.lock}
                            placeholder="12345"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) => setVerification({...verification, code})}
                        />
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        )}
                        <CustomButton
                            title="Verify Email"
                            onPress={onVerifyPress}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl text-primary-900 font-JakartaBold text-center">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-400 font-JakartaBold text-center">
                            You have successfully verified your account.
                        </Text>
                        <CustomButton
                            title="Browse Home"
                            className="mt-5"
                            onPress={() => router.replace("/(root)/(tabs)/home")}
                        />
                    </View>
                </ReactNativeModal>

            </View>
        </SafeAreaView>
)
}

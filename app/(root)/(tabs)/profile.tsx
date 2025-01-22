import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {Button, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useContext, useState} from "react";
import {Context} from "@/components/Context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/custom_templates/CustomButton";
import api from "@/api";
import {ReactNativeModal} from "react-native-modal";
import {icons, images} from "@/constants";
import {router} from "expo-router";
import {AxiosResponse} from "axios/index";
import {User} from "@/types/type";

export default function RootProfile() {

    const { user } = useUser();
    const {appUser, setAppUser} = useContext(Context)
    const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY
    const apiURL = process.env.EXPO_PUBLIC_BACKEND_API_URL

    const initialValue = {username: appUser?.username, email: appUser?.email}
    const [formData, setFormData] = useState(initialValue)

    const [verification, setVerification] = useState({
        state: "default",  // default, using "success" / "pending" for testing
        error: "",
        code: ""
    })
    const [error, setError] = useState<string |null>(null)
    const [success, setSuccess] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false)


    function handleInput(name: string, text: string) {
        setFormData({...formData, [name]: text})
    }

    const isFormChanged = formData.username !== initialValue.username || formData.email !== initialValue.email;
    const isFormEmpty = !formData.username.trim() || !formData.email.trim();
    const isButtonDisabled = isFormEmpty || !isFormChanged;

    const clerkUserEmail = user?.emailAddresses[0]["emailAddress"]

    async function handleUpdateEmail() {
        console.log(user?.id)
        console.log("before", user?.emailAddresses[0])
        const addEmailResponse = await fetch(`${apiURL}/email_addresses`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user?.id,
                email_address: formData.email,
                verified: true, primary: true
            })
        })

        // uses await instead of .then()
        const emailData = await addEmailResponse.json()

        // =================== update database ====================================================
        const updatedUserResponse: AxiosResponse<User> = await api.patch(
            `/users/${appUser?.id}`,
            {email: emailData.email_address}
        )
        setAppUser(updatedUserResponse.data)
        setSuccess("Update succeed.")

        // ================== delete previous email ====================================================
        // const response = await api.delete(`/email_addresses/{email_address_id}`)
        //
        // console.log("test2")
    }
    async function handleCheckEmail() {
        await fetch(`${apiURL}/users/count?email_address=${formData.email}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${secretKey}`, // Use the secret key here
                "Content-Type": "application/json",
            }})
            .then(res => res.json())
            .then(data => {
                if (data.total_count === 0) {
                    handleUpdateEmail()
                } else {
                    console.log("not ok")
                }
            })
    }

    // console.log("user", user?.emailAddresses.filter("ziru.fish@gmail.com"))
    // console.log("user?.emailAddresses", user?.emailAddresses[0].id)
    async function handleSavePress() {
        if (user && appUser) {
            if (!formData.email || !formData.username) {
                setError('Username and email address cannot be empty.')
            }

            // only username is changed
            if (clerkUserEmail === formData.email  && appUser?.user !== formData.username) {
                console.log('username is changed')
                // only update database
                try {
                    const updatedData = {username: formData.username}
                    const response = await api.patch(`/users/${appUser?.id}`, updatedData)
                    const data = response.data
                    setAppUser({
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        created_at: data.formatted_created_at
                    })
                } catch (error) {
                    console.error("Error updating username:", error);
                }
            } else {
                console.log('email is changed and/or username is changed')

                // when email is changed and/or username is changed
                await handleCheckEmail()



            }

        }
    }

    // console.log(user)
    // console.log("appUser", appUser, appUser?.id)
    // console.log(user?.username)
    // await user.update(formData)

    console.log("Profile Page Loaded.")

    return (
        <SafeAreaView className="flex h-full p-5 bg-white">
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

                <View className="mb-4">
                    <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

                    <View className="flex items-center justify-center my-5">
                        <Image
                            source={{
                                uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                            }}
                            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
                            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
                        />
                    </View>
                </View>


                <View
                    className="flex flex-col items-start justify-center bg-white"
                    style={{borderRadius: 25}}
                >
                    <View
                        className="flex flex-col items-start justify-start w-full p-5 "
                        style={{borderRadius: 25}}
                    >
                        <InputField
                            label="Username"
                            placeholder={appUser?.username || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            value={formData?.username}
                            onChangeText={(text) => handleInput("username", text)}

                        />


                        <InputField
                            label="Email"
                            placeholder={
                                user?.primaryEmailAddress?.emailAddress || "Not Found"
                            }
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            value={formData?.email}
                            onChangeText={(text) => handleInput("email", text)}

                        />

                        <View
                            className="w-full p-3 flex flex-1 justify-center items-center shadow-md shadow-neutral-400/70 mt-4"
                            style={{backgroundColor: "#38A169", opacity: isButtonDisabled ? 0.5 : 1}}
                        >
                            <TouchableOpacity
                                disabled={isButtonDisabled}
                                onPress={handleSavePress}

                            >
                                <Text className={`text-center text-lg font-bold text-white`}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

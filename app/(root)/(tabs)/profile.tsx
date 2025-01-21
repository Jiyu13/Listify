import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {Button, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useContext, useState} from "react";
import {Context} from "@/components/Context";
import InputField from "@/components/InputField";
import CustomButton from "@/components/custom_templates/CustomButton";
import api from "@/api";

export default function RootProfile() {

    const { user } = useUser();
    const {appUser, setAppUser} = useContext(Context)

    const initialValue = {username: appUser?.username, email: appUser?.email}
    const [formData, setFormData] = useState(initialValue)

    function handleInput(name: string, text: string) {
        setFormData({...formData, [name]: text})
    }

    const isFormChanged = formData.username !== initialValue.username || formData.email !== initialValue.email;
    const isFormEmpty = !formData.username.trim() || !formData.email.trim();
    const isButtonDisabled = isFormEmpty || !isFormChanged;

    const clerkUserEmail = user?.emailAddresses[0]["emailAddress"]

    async function handleSave() {
        if (user && appUser) {
            if (clerkUserEmail === formData.email ) {
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
                console.log("")
                // await user.update({emailAddress: formData.email})

                    // .then(res=> console.log(res.username))
            }

        }
        console.log("appUser", appUser, appUser?.id)
        // console.log(user?.username)
        // await user.update(formData)

    }



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
                                onPress={handleSave}

                            >
                                <Text className={`text-center text-lg font-bold text-white`}>
                                    Save
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/*{!isButtonDisabled ?*/}

                        {/*    <CustomButton*/}
                        {/*        title="Save"*/}
                        {/*        bgVariant="success"*/}
                        {/*        onPress={handleSave}*/}
                        {/*        className="mt-5"*/}
                        {/*    />*/}

                        {/*    :*/}
                        {/*    <TouchableOpacity*/}
                        {/*        onPress={handleSave}*/}
                        {/*        className={`w-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 bg-success-300`}*/}
                        {/*    >*/}
                        {/*        <Text className={`text-lg font-bold`}>*/}
                        {/*            Save*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*}*/}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

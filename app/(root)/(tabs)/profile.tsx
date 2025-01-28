import {useUser} from "@clerk/clerk-expo";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useContext, useState} from "react";
import {Context} from "@/components/Context";
import InputField from "@/components/InputField";
import api from "@/api";
import {ReactNativeModal} from "react-native-modal";
import {images} from "@/constants";
import {useNavigation} from "expo-router";
import {AxiosResponse} from "axios/index";
import {User} from "@/types/type";
import {MaterialIcons} from "@expo/vector-icons";
import LogoutModal from "@/components/modals/LogoutModal";
import FormButton from "@/components/buttons/FormButton";

export default function RootProfile() {

    const { user } = useUser();
    const {appUser, setAppUser} = useContext(Context)
    const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY
    const apiURL = process.env.EXPO_PUBLIC_BACKEND_API_URL

    const initialValue = {username: appUser?.username, email: appUser?.email}
    const [formData, setFormData] = useState(initialValue)

    const [error, setError] = useState<string |null>(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [isLogout, setIsLogout] = useState(false)

    function handleInput(name: string, text: string) {
        setFormData({...formData, [name]: text})
    }

    const isFormChanged = formData.username !== initialValue.username || formData.email !== initialValue.email;
    const isFormEmpty = !formData.username || !formData.email;
    const isButtonDisabled = isFormEmpty || !isFormChanged;

    const clerkUserEmail = user?.emailAddresses[0]["emailAddress"]

    async function handleUpdateEmail() {
        // ======================== update to new email =================================
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
        console.log("finish updating email.")
        // uses await instead of .then()
        const newEmailData = await addEmailResponse.json()
        // console.log("newEmailData", newEmailData.email_address, newEmailData.id)
        // console.log("previousEmailId", user?.emailAddresses[0].emailAddress, user?.emailAddresses[0].id)
        // ================== delete previous email by email id====================================================
        const response = await fetch(`${apiURL}/email_addresses/${user?.emailAddresses[0].id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${secretKey}`, // Use the secret key here
                "Content-Type": "application/json",
            }
        })

        const deleteData = await response.json()
        if (deleteData.deleted) {
            console.log("finish deleting email.")
            console.log("start updating db")
            // =================== update database with new email mail ====================================================
            const updatedUserResponse: AxiosResponse<User> = await api.patch(
                `/users/${appUser?.id}`,
                {email: newEmailData.email_address, username: formData.username}
            )
            setAppUser(updatedUserResponse.data)
            setShowSuccessModal(true)
            console.log("finish updating db")
        } else {
            console.log("Failed to delete email.")
            setError("Failed to delete.")
        }
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

    async function handleSavePress() {
        if (user && appUser) {
            if (!formData.email || !formData.username) {
                setError('Username and email address cannot be empty.')
            }

            if (clerkUserEmail === formData.email  && appUser?.user !== formData.username) {
                // only username is changed, only update database
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
                    setShowSuccessModal(true)
                    console.log("Username updated.")
                } catch (error) {
                    console.error("Error updating username:", error);
                }
            } else if (clerkUserEmail !== formData.email) {
                // when email is changed and username is unchanged
                await handleCheckEmail()
            }
        }
    }

    const navigation = useNavigation();
    function handleCloseButtonPress () {
        setShowSuccessModal(false)
        // @ts-ignore
        navigation.navigate('profile')
    }

    function handleClickLogout() {
        setIsLogout(true)
    }

    console.log("Profile Page Loaded.")

    return (
        <SafeAreaView className="flex h-full p-5 bg-white">
            <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

                <View className="mb-4">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

                        <TouchableOpacity
                            onPress={handleClickLogout}
                            className="flex items-center justify-center px-4"
                        >
                            <MaterialIcons name='logout' size={28}/>
                        </TouchableOpacity>
                    </View>

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

                        {/*<View*/}
                        {/*    className="w-full p-3 flex flex-1 justify-center items-center shadow-md shadow-neutral-400/70 mt-4"*/}
                        {/*    style={{backgroundColor: "#38A169", opacity: isButtonDisabled ? 0.5 : 1}}*/}
                        {/*>*/}
                        {/*    <TouchableOpacity*/}
                        {/*        disabled={isButtonDisabled}*/}
                        {/*        onPress={handleSavePress}*/}

                        {/*    >*/}
                        {/*        <Text className={`text-center text-lg font-bold text-white`}>*/}
                        {/*            Save*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}

                            <FormButton
                                disabled={isButtonDisabled}
                                buttonText='Save'
                                onPress={handleSavePress}
                                style={{opacity: isButtonDisabled ? 0.5 : 1, borderRadius: 12}}
                            />


                        {/*========================  Update Succeed Modal ========================*/}
                        <ReactNativeModal
                            isVisible={showSuccessModal}
                            backdropOpacity={0.3}
                            backdropTransitionOutTiming={0} // Instantly remove the backdrop
                            animationIn="slideInUp" // Controls how the modal appears
                            animationOut="slideOutDown" // Controls how the modal disappears
                            animationOutTiming={300} // Adjusts the duration of the closing animation
                            onBackdropPress={() => setShowSuccessModal(false)}  // close modal if clicking outside <View>
                            onBackButtonPress={() => setShowSuccessModal(false)}
                        >
                            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                                <Image
                                    source={images.check}
                                    className="w-[105px] h-[105px] mx-auto"
                                />
                                {/*<Text className="text-3xl text-primary-900 font-JakartaBold text-center">*/}
                                {/*    */}
                                {/*</Text>*/}
                                <Text className="text-base text-gray-400 font-JakartaBold text-center my-5">
                                    You have successfully updated your account.
                                </Text>
                                <FormButton
                                    buttonText="Close"
                                    // className="mt-5"
                                    onPress={handleCloseButtonPress}
                                />
                            </View>
                        </ReactNativeModal>

                        <LogoutModal
                            isLogout={isLogout}
                            setIsLogout={setIsLogout}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

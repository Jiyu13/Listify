import {useUser} from "@clerk/clerk-expo";
import {Image, Text, View} from "react-native";
import React, {useContext, useState} from "react";
import {Context} from "@/components/Context";
import InputField from "@/components/InputField";
import api from "@/api";
import {images} from "@/constants";
import {useNavigation} from "expo-router";
// @ts-ignore
import {AxiosResponse} from "axios/index";
import {User} from "@/types/type";
import LogoutModal from "@/components/modals/LogoutModal";
import FormButton from "@/components/buttons/FormButton";
import ModalTemplate from "@/components/modals/ModalTemplate";
import TabHeader from "@/components/headers/TabHeader";
import CustomPageTemplate from "@/components/custom_templates/CustomPageTemplate";

export default function RootProfile() {

    const { user } = useUser();
    const {appUser, setAppUser} = useContext(Context)
    const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY
    const apiURL = process.env.EXPO_PUBLIC_BACKEND_API_URL

    const initialValue = {username: appUser?.username, email: appUser?.email}
    const [formData, setFormData] = useState(initialValue)

    const [error, setError] = useState({emailError: "", usernameError: ""})
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    const [isLogout, setIsLogout] = useState(false)

    function handleInput(name: string, text: string) {
        setFormData({...formData, [name]: text})
        setError({emailError: "", usernameError: ""})
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
            // setError("Failed to delete.")
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
                    setError({emailError: "Email has been taken.", usernameError: ""})
                    return
                }
            })
    }

    async function handleSavePress() {
        if (user && appUser) {
            if (!formData.username.trim() && formData.email.trim()) {
                setError({
                    emailError: "", usernameError: "Please enter username."
                })
                return
            } else if (formData.username.trim() && !formData.email.trim()) {
                setError({
                    emailError: "Please enter email.", usernameError: ""
                })
                return
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
                    setError({emailError: "", usernameError: ""});
                    console.log("Username updated.")
                } catch (error:any) {
                    // console.log("not ok", error.response.data.error)
                   setError({emailError: "", usernameError: error.response.data.error});
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

    function handleOnFocus() {
        setError({emailError: "", usernameError: ""});
    }

    console.log("Profile Page Loaded.")

    return (
        <CustomPageTemplate
            header={
                <TabHeader
                    headerText="My Profile"
                    searchText=""
                    handleRightIconClick={handleClickLogout}
                    searchInput={""}
                    handleSearch={() => {}}
                    rightIconName="log-out-outline"
                />
            }
            children={
                <View className="flex flex-col items-center justify-center">
                    <View className="flex items-center justify-center my-5">
                        <Image
                            source={{uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,}}
                            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
                            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
                        />
                    </View>
                    <View
                        className="flex flex-col items-start justify-start w-full p-5 bg-white rounded-2xl"
                    >
                        <InputField
                            label="Username"
                            placeholder={appUser?.username || "Not Found"}
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            value={formData?.username}
                            onChangeText={(text) => handleInput("username", text)}
                            onFocus={handleOnFocus}
                        />
                        {error && error?.usernameError && (<Text className="text-danger-700">{error?.usernameError}</Text>)}

                        <InputField
                            label="Email"
                            placeholder={
                                user?.primaryEmailAddress?.emailAddress || "Not Found"
                            }
                            containerStyle="w-full"
                            inputStyle="p-3.5"
                            value={formData?.email}
                            onChangeText={(text) => handleInput("email", text)}
                            onFocus={handleOnFocus}
                        />
                        {error && error?.emailError && (<Text className="text-danger-700">{error?.emailError}</Text>)}

                        <FormButton
                            disabled={isButtonDisabled}
                            buttonText='Save'
                            onPress={handleSavePress}
                            style={{opacity: isButtonDisabled ? 0.5 : 1, borderRadius: 12}}
                        />

                    </View>

                    {/*========================  Update Succeed Modal ========================*/}
                    <ModalTemplate
                        isModalVisible={showSuccessModal}
                        setModalVisible={setShowSuccessModal}
                        children={
                            <View className="bg-white m-4 px-7 py-9 rounded-2xl min-h-[300px]">
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
                        }
                    />

                </View>
            }
            form={<ModalTemplate
                isModalVisible={isLogout}
                setModalVisible={setIsLogout}
                modalStyle={{margin: 0, justifyContent: 'flex-end',}}
                children={
                    <LogoutModal
                        isLogout={isLogout}
                        setIsLogout={setIsLogout}
                    />
                }
            />}

    />
    )
}

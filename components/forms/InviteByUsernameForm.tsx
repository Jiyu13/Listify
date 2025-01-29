import {ReactNativeModal} from "react-native-modal";
import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {List} from "@/types/type";
import api from "@/api";
import {Context} from "@/components/Context";
import FormButton from "@/components/buttons/FormButton";

type ShareFormData = { email: string } | { username: string };
export default function InviteByUsernameForm(
    {
        listId, inviteType, isFormModalOpen, setIsFormModalOpen, buttonText
    } : {
        listId: number,
        inviteType: string,
        isFormModalOpen: boolean,
        setIsFormModalOpen: Dispatch<SetStateAction<boolean>>,
        buttonText: string,
    }) {

    const {userLists, setUserLists} = useContext(Context)
    const initialValue = inviteType === 'email' ? {email: ""} : {username: ""}
    const [shareFormData, setShareFormData] = useState<ShareFormData>(initialValue)
    const [shareFormError, setShareFormError] = useState("")


    const labelName = inviteType === 'username' ? "Enter username" : "Enter email"
    const inputValue = "email" in shareFormData ? shareFormData?.email : shareFormData?.username


    function handleShareFormInput(inviteType: string, value: string) {
        if (inviteType === "email") {
            setShareFormData({ email: value.trim() });
        } else {
            setShareFormData({ username: value.trim() });
        }
        setShareFormError("")
    }

    async function handleShareFormSubmit() {
        try {
            const response = await api.post(`/ul/${listId}`, shareFormData)
            const result = response.data
            const updatedLists = userLists.map(( ul : List) => {
                if (ul.id === result.id) {
                    return result
                } else {
                    return ul
                }
            })
            setUserLists(updatedLists)
            setShareFormData(initialValue)
            setIsFormModalOpen(false)
        } catch (error) {
            // console.log("catch error", error.response.data)
            // @ts-ignore
            setShareFormError( error.response.data.error)
        }
    }

    function handleCloseForm() {
        setIsFormModalOpen(false)
        setShareFormData(initialValue)
        setShareFormError("")
    }

    return (
        <ReactNativeModal
            isVisible={isFormModalOpen}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={handleCloseForm}  // close modal if clicking outside <View>
            onBackButtonPress={handleCloseForm} // for Android, handles back button press
        >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">

                <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">
                    Invite
                </Text>

                <InputField
                    label={labelName}
                    value={inputValue}
                    onChangeText={(text) => handleShareFormInput(inviteType, text)}
                />

                {shareFormError && (<Text className="text-danger-700">{shareFormError}</Text>)}

                <FormButton
                    buttonText={buttonText}
                    onPress={handleShareFormSubmit}
                    // className="mt-6 p-4"
                    disabled={!inputValue|| shareFormError !== ""}
                    style={{opacity: !inputValue || shareFormError ? 0.5 : 1}}
                />
                {/*<CustomButton*/}
                {/*    title={buttonText}*/}
                {/*    disabled={!inputValue|| shareFormError !== ""}*/}
                {/*    onPress={handleShareFormSubmit}*/}
                {/*    // className="mt-5"*/}
                {/*    style={{backgroundColor: "#38A169", opacity: !inputValue || shareFormError ? 0.5 : 1}}*/}
                {/*/>*/}

            </View>
        </ReactNativeModal>
    )
}

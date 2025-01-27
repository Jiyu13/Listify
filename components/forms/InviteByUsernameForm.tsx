import {ReactNativeModal} from "react-native-modal";
import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import CustomButton from "@/components/custom_templates/CustomButton";
import React, {Dispatch, SetStateAction, useState} from "react";
import {List} from "@/types/type";
import {awaitExpression} from "@babel/types";
import api from "@/api";

export default function InviteByUsernameForm(
    {
        listId, inviteType, isFormModalOpen, setIsFormModalOpen, buttonText
        // formData, setFormData, handleInput,
        // handleButtonPress,
    } : {
        listId: number,
        inviteType: string,
        isFormModalOpen: boolean,
        setIsFormModalOpen: Dispatch<SetStateAction<boolean>>,
        // formData: {name: string},
        // setFormData: Dispatch<SetStateAction<{ name: string }>>,
        // handleInput: (name: string, value: string) => void,
        // handleButtonPress: (editType: string) => void,
        buttonText: string
    }) {

    const [shareFormData, setShareFormData] = useState({name: ""})

    const [shareFormError, setShareFormError] = useState("")


    function handleShareFormInput(name: string, value: string) {
        setShareFormData({...shareFormData, [name]: value})
        setShareFormError("")
    }

    async function handleShareFormSubmit() {
        try {
            const response = await api.post(`/ul/${listId}`, shareFormData)
            const result = response.data
        } catch (error) {
            // console.log("catch error", error.response.data)
            // @ts-ignore
            setShareFormError( error.response.data.error)
        }
    }

    function handleCloseForm() {
        setIsFormModalOpen(false)
        setShareFormData({name: ""})
    }
    const labelName = inviteType === 'username' ? "Enter username" : "Enter email"

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
                    placeholder={shareFormData?.name}
                    value={shareFormData?.name}
                    onChangeText={(text) => handleShareFormInput("name", text)}
                />

                {shareFormError && (<Text className="text-danger-700">{shareFormError}</Text>)}


                <CustomButton
                    title={buttonText}
                    disabled={!shareFormData.name || shareFormError !== ""}
                    onPress={handleShareFormSubmit}
                    className="mt-5"
                    style={{backgroundColor: "#38A169", opacity: !shareFormData.name || shareFormError ? 0.5 : 1}}
                />

            </View>
        </ReactNativeModal>
    )
}

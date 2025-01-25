import {ReactNativeModal} from "react-native-modal";
import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import CustomButton from "@/components/custom_templates/CustomButton";
import React, {Dispatch, SetStateAction} from "react";
import {List} from "@/types/type";

export default function InviteByUsernameForm(
    {
        inviteType, isFormModalOpen, setIsFormModalOpen, formData, setFormData, handleInput, handleButtonPress, buttonText
    } : {
        inviteType: string,
        isFormModalOpen: boolean,
        setIsFormModalOpen: Dispatch<SetStateAction<boolean>>,
        formData: {name: string},
        setFormData: Dispatch<SetStateAction<{ name: string }>>,
        handleInput: (name: string, value: string) => void,
        handleButtonPress: (editType: string) => void,
        buttonText: string
    }) {
    const labelName = inviteType === 'username' ? "Enter username" : "Enter email"

    return (
        <ReactNativeModal
            isVisible={isFormModalOpen}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setIsFormModalOpen(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setIsFormModalOpen(false)} // for Android, handles back button press
        >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">

                <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">
                    Invite
                </Text>

                <InputField
                    label={labelName}
                    placeholder={formData?.name}
                    value={formData?.name}
                    onChangeText={(text) => handleInput("name", text)}
                />

                <CustomButton
                    title={buttonText}
                    onPress={() => handleButtonPress}
                    className="mt-5 bg-success-500"
                />

            </View>
        </ReactNativeModal>
    )
}

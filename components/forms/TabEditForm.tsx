import {ReactNativeModal} from "react-native-modal";
import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import React, {Dispatch, SetStateAction} from "react";
import {List} from "@/types/type";
import FormButton from "@/components/buttons/FormButton";

export default function TabEditForm(
    {
        editType, isFormModalOpen, setIsFormModalOpen, formData, setFormData, handleInput, handleButtonPress, buttonText
    } : {
        editType: string,
        isFormModalOpen: boolean,
        setIsFormModalOpen: Dispatch<SetStateAction<boolean>>,
        formData: List,
        setFormData: Dispatch<SetStateAction<List>>,
        handleInput: (name: string, value: string) => void,
        handleButtonPress: (editType: string) => void,
        buttonText: string
    }) {
    const labelName = editType === 'name' ? "List Name" : "Share with"
    const modalTitle = editType === "name" ? "Rename List" : "Share List"

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

                {/*TODO: replace with a children component*/}

                <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">
                    {modalTitle}
                </Text>

                <InputField
                    label={labelName}
                    // icon={icons.lock}
                    placeholder={formData?.name}
                    value={formData?.name}
                    onChangeText={(text) => handleInput("name", text)}
                />

                <FormButton
                    buttonText={buttonText}
                    onPress={() => handleButtonPress(editType)}
                />

                {/*TODO: replace with a children component*/}
            </View>
        </ReactNativeModal>
    )
}

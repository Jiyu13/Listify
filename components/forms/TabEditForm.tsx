import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import React from "react";
import {List} from "@/types/type";
import FormButton from "@/components/buttons/FormButton";

export default function TabEditForm(
    {
        editType, formData, handleInput, handleButtonPress, buttonText
    } : {
        editType: string,
        formData: List,
        handleInput: (name: string, value: string) => void,
        handleButtonPress: (editType: string) => void,
        buttonText: string
    }) {
    const labelName = editType === 'name' ? "List Name" : "Share with"
    const modalTitle = editType === "name" ? "Rename List" : "Share List"

    return (

            <View className="bg-white m-4 px-7 py-9 rounded-2xl min-h-[300px]">

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
    )
}

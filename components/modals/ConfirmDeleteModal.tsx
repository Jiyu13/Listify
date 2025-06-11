import {Text, View} from "react-native";
import FormButton from "@/components/buttons/FormButton";
import {ReactNativeModal} from "react-native-modal";
import React, {Dispatch, SetStateAction} from "react";

export default function ConfirmDeleteModal({
   name, isDeleteModalVisible, setIsDeleteModalVisible, handleConfirmDelete
}: {
    name: string,
    isDeleteModalVisible: boolean,
    setIsDeleteModalVisible: Dispatch<SetStateAction<boolean>>
    handleConfirmDelete: () => void
}) {
    return (
            <View className="bg-white m-4 px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-xl text-primary-900 font-JakartaBold text-center">{name}</Text>

                <Text className="text-xl text-primary-900 font-Jakarta mt-5 text-center">Do you want to delete this?</Text>

                <FormButton
                    buttonText="Cancel"
                    onPress={() => setIsDeleteModalVisible(false)}
                    bgVariant='outline'
                    textVariant="primary"
                    className="mt-10"
                />
                <FormButton
                    buttonText="Delete"
                    onPress={handleConfirmDelete}
                    textVariant='danger'
                />
            </View>
    )
}

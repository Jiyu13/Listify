import {Text, View} from "react-native";
import InputField from "@/components/InputField";
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
        <ReactNativeModal
            isVisible={isDeleteModalVisible}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setIsDeleteModalVisible(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setIsDeleteModalVisible(false)} // for Android, handles back button press
        >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
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
        </ReactNativeModal>
    )
}

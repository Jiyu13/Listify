import {ReactNativeModal} from "react-native-modal";
import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import React, {Dispatch, SetStateAction} from "react";
import {ListItem} from "@/types/type";
import api from "@/api";
import FormButton from "@/components/buttons/FormButton";

interface EditItemFormData {description: string; units: string;}

export default function EditItemForm({
    item, editFormVisible, setEditFormVisible, formData, handleInput, setListItems
} : {
    item: ListItem,
    formData: EditItemFormData,
    editFormVisible: boolean,
    setEditFormVisible: Dispatch<SetStateAction<boolean>>,
    handleInput: (name: string, value: string) => void,
    setListItems: Dispatch<SetStateAction<ListItem[]>>
}) {

    async function handleConfirmEditItem() {
        try {
            const response = await api.patch(`/lists/${item?.list_id}/${item?.id}`, formData)
            const updatedItem = response.data

            setListItems((prevItems) =>
                prevItems.map((i) => i.id === updatedItem.id ? updatedItem: i)
            )

        } catch(error) {
            console.error("Error editing item by list id:", error);

        }
        setEditFormVisible(false)
    }

    return (
        <ReactNativeModal
            isVisible={editFormVisible}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setEditFormVisible(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setEditFormVisible(false)} // for Android, handles back button press
        >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">Edit Item</Text>
                <InputField
                    label="Item Name"
                    placeholder={formData.description}
                    value={formData.description}
                    onChangeText={(text) => handleInput("description", text)}
                />
                <InputField
                    label="Unit"
                    placeholder={formData.units}
                    value={formData.units}
                    onChangeText={(text) => handleInput("units", text)}
                />

                <FormButton
                    buttonText="Submit"
                    onPress={handleConfirmEditItem}
                />
            </View>
        </ReactNativeModal>
    )
}

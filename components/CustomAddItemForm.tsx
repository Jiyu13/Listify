import {ReactNativeModal} from "react-native-modal";
import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import React, {useContext, useState} from "react";
import {ListItem} from "@/types/type";
import api from "@/api";
import {Context} from "@/components/Context";

export default function CustomAddItemForm({setIsAddModalOpen, isAddModalOpen, listId}) {

    const {setListItems, listItem} = useContext(Context)
    const [newItemData, setNEwItemData] = useState<ListItem>({
        description: "",
        units: ""
    })

    function handleInput(name: string, value: string) {
        setNEwItemData({...newItemData, [name]: value})
    }
    async function handleAddItem() {
        setIsAddModalOpen(false)
        try {
            const response = await api.post(`/lists/${listId}/add-item`, newItemData)
            const newItem = response.data
            setListItems((prev) => [...prev, newItem])
        } catch(error) {
            console.error("Error adding item by list id:", error);

        }

    }

    return (
        <ReactNativeModal
            isVisible={isAddModalOpen}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setIsAddModalOpen(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setIsAddModalOpen(false)} // for Android, handles back button press
        >
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">Add New Item</Text>
                <InputField
                    label="Item Name"
                    // icon={icons.lock}
                    placeholder=""
                    value={newItemData.description}
                    onChangeText={(text) => handleInput("description", text)}
                />
                <InputField
                    label="Unit"
                    // icon={icons.lock}
                    placeholder="e.g., 1 lbs"
                    value={newItemData.units}
                    onChangeText={(text) => handleInput("units", text)}
                />

                <CustomButton
                    title="Add"
                    onPress={handleAddItem}
                    className="mt-5 bg-success-500"
                />
            </View>
        </ReactNativeModal>
    )
}

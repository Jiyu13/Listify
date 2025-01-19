import {ReactNativeModal} from "react-native-modal";
import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {List, ListItem} from "@/types/type";
import api from "@/api";
import {Context} from "@/components/Context";

export default function CustomAddItemForm({
        setIsAddModalOpen, isAddModalOpen, listId, listItems, setListItems
} : {
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>,
    isAddModalOpen: boolean,
    listId: number,
    listItems: ListItem[],
    setListItems: Dispatch<SetStateAction<ListItem[]>>
}) {

    const {userLists, setUserLists} = useContext(Context)

    const initialValue= {description: "", units: ""}
    const [newItemData, setNewItemData] = useState<ListItem>(initialValue)

    function handleInput(name: string, value: string) {
        setNewItemData({...newItemData, [name]: value})
    }
    async function handleAddItem() {
        setIsAddModalOpen(false)
        try {
            const response = await api.post(`/lists/${listId}/add-item`, newItemData)

            const updatedUserLists = userLists?.map((list: List) => {
                if (list.id === listId) {
                    return {...list, item_count: list.item_count + 1}
                }
                return list
            })
            console.log("userList", updatedUserLists)
            const newItem = response.data
            // @ts-ignore
            setListItems((prev) => [...prev, newItem])
            setUserLists(updatedUserLists)
        } catch(error) {
            console.error("Error adding item by list id:", error);

        }
        setNewItemData(initialValue)

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

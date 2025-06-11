import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {List, ListItem} from "@/types/type";
import api from "@/api";
import {Context} from "@/components/Context";
import FormButton from "@/components/buttons/FormButton";

export default function ItemAddForm({
    listId, setItems, setShowAddForm
} : {
    listId: number,
    setItems: Dispatch<SetStateAction<ListItem[]>>
    setShowAddForm: Dispatch<SetStateAction<boolean>>,


}) {

    const {userLists, setUserLists} = useContext(Context)

    const initialValue= {description: "", units: ""}
    const [newItemData, setNewItemData] = useState<ListItem>(initialValue)

    function handleInput(name: string, value: string) {
        setNewItemData({...newItemData, [name]: value})
    }
    async function handleAddItem() {
        setShowAddForm(false)
        try {
            const response = await api.post(`/lists/${listId}/add-item`, newItemData)

            const updatedUserLists = userLists?.map((list: List) => {
                if (list.id === listId) {
                    return {...list, item_count: list.item_count + 1}
                }
                return list
            })
            const newItem = response.data
            // @ts-ignore
            setItems((prev) => [...prev, newItem])
            setUserLists(updatedUserLists)
        } catch(error) {
            console.error("Error adding item by list id:", error);

        }
        setNewItemData(initialValue)

    }

    return (

            <View className="bg-white m-4 px-7 py-9 rounded-2xl min-h-[300px]">
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

                <FormButton
                    buttonText="Add"
                    onPress={handleAddItem}
                    disabled={!newItemData.description}
                    style={{opacity: !newItemData.description ? 0.5 : 1, borderRadius: 12}}
                />
            </View>
    )
}

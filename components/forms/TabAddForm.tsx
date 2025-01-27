import {Text, View} from "react-native";
import InputField from "@/components/InputField";
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import api from "@/api";
import {Context} from "@/components/Context";
import {ReactNativeModal} from "react-native-modal";
import {useAuth} from "@clerk/clerk-expo";
import FormButton from "@/components/buttons/FormButton";

export default function TabAddForm({
   showAddForm, setShowAddForm
}: {
    showAddForm: boolean,
    setShowAddForm: Dispatch<SetStateAction<boolean>>,

}) {

    const { isSignedIn } = useAuth()
    const {appUser, setUserLists} = useContext(Context)


    const initialValue= {name: ""}
    const [newListData, setNewListData] = useState(initialValue)

    async function handleAddList() {
        setShowAddForm(!showAddForm)
        if (isSignedIn && appUser) {
            const userId = appUser?.id
            try {
                const response = await api.post(`/lists/${userId}`, newListData)
                const newList = {...response.data, item_count: 0}
                // @ts-ignore
                setUserLists((prev) => [newList, ...prev])
            } catch(error) {
                console.error("Error adding item by list id:", error);

            }
        }

        setNewListData({name: ""})
    }

    function handleInput(name: string, value: string) {
        setNewListData({...newListData, [name]: value})
    }


    return (
        <ReactNativeModal
            isVisible={showAddForm}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setShowAddForm(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setShowAddForm(false)} // for Android, handles back button press
        >

            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">
                    New List
                </Text>
                <InputField
                    label="List Name"
                    placeholder="e.g., grocery list"
                    value={newListData.name}
                    onChangeText={(text) => handleInput("name", text)}
                />
                <FormButton
                    buttonText='Create'
                    onPress={handleAddList}
                    // className="mt-6 p-4"
                />
                {/*<CustomButton*/}
                {/*    title="Create"*/}
                {/*    onPress={handleAddList}*/}
                {/*    className="mt-5 bg-success-500"*/}
                {/*/>*/}
            </View>

        </ReactNativeModal>

    )
}

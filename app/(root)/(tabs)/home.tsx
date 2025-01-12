import {View, Text, TouchableOpacity} from "react-native";
import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CustomButton from "@/components/CustomButton";
import {Ionicons} from "@expo/vector-icons";
import {ReactNativeModal} from "react-native-modal";
import {icons} from "@/constants";
import InputField from "@/components/InputField";

export default function Page() {
    const {user} = useUser()
    const [testMessage, setTestMessage] = useState('');
    const [showAddForm, setShowAddForm] = useState(false)
    const [newListData, setNewListData] = useState({name: ""})

    console.log("Home Page Loaded");
    console.log(user?.emailAddresses[0].emailAddress)

    useEffect(() => {
        axios('http://192.168.1.168:5000/api/v1/listify')
            .then(res => {
                setTestMessage(res.data.message)
            })
            .catch(error => {
                console.error("Error fetching data", error)}
            )
    }, [])

    function handleAddOnPress() {
       setShowAddForm(!showAddForm)
    }
    function handleInput(name: string, value: string) {
        setNewListData(prev => setNewListData({...prev, [name]: value}))
    }

    return (
        <SafeAreaView>
            <View className="h-20 p-5">
                <View className="flex flex-row items-center justify-between"
                      style={{}}
                >
                    <Text className="text-3xl font-JakartaBold">Lists</Text>
                    <TouchableOpacity onPress={handleAddOnPress}>
                        <Ionicons name="add" size={32} color="#3e4e50" />
                    </TouchableOpacity>
                </View>



                {/* ====================== ADD A LIST FORM=========================*/}
                <ReactNativeModal isVisible={showAddForm}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">New List</Text>
                        <InputField
                            label="List Name"
                            // icon={icons.lock}
                            placeholder="grocery list"
                            value={newListData.name}
                            onChangeText={(text) => handleInput("name", text)}
                        />
                        <CustomButton
                            title="Create"
                            onPress={handleAddOnPress}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>


            </View>
        </SafeAreaView>
    )
}

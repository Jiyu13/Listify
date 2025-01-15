import {View, Text, TouchableOpacity, TextInput} from "react-native";
import {SignedIn, SignedOut, useAuth, useUser} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import React, {useContext, useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import CustomButton from "@/components/CustomButton";
import {Ionicons} from "@expo/vector-icons";
import {ReactNativeModal} from "react-native-modal";
import InputField from "@/components/InputField";
import ListItems from "@/components/ListItems";
import {Context} from "@/components/Context";
import api from "@/api";
import {User} from "@/types/type";

export default function HomePage() {
    const { isSignedIn } = useAuth()
    const {user} = useUser()
    const {setAppUser, appUser} = useContext(Context)

    const [showAddForm, setShowAddForm] = useState(false)
    const [newListData, setNewListData] = useState({name: ""})

    console.log("Home Page Loaded");

    useEffect(() => {
        const fetchUserByEmail = async () => {
            if (isSignedIn) {
                try {
                    const email = user?.emailAddresses[0].emailAddress;
                    const response: AxiosResponse<User> = await api.get(`/users/${email}`);
                    setAppUser(response.data);
                } catch (error) {
                    console.error("Error fetching user by email:", error);
                }
            }
        };

        fetchUserByEmail();
    }, [isSignedIn, user]);
    console.log("appUser-----------home-------------", appUser)

    function handleAddOnPress() {
       setShowAddForm(!showAddForm)
    }
    function handleInput(name: string, value: string) {
        setNewListData(prev => setNewListData({...prev, [name]: value}))
    }

    function handleSearchList() {
        return
    }
    return (
        <SafeAreaView className="flex h-full">
            <View className="p-5">
                <View className="mb-4">
                    <View className="flex flex-row items-center justify-between h-20 ">
                        <Text className="text-3xl font-JakartaBold">Lists</Text>
                        <TouchableOpacity onPress={handleAddOnPress}>
                            <Ionicons name="add" size={32} color="#3e4e50" />
                        </TouchableOpacity>
                    </View>

                    {/* ======================== SEARCH BAR ===========================*/}
                    <View className="flex flex-row justify-start items-center h-14 bg-secondary-300 rounded-2xl">
                        <Ionicons name="search" size={24} color="gray" className="mx-2.5"/>
                        <TextInput
                            placeholder="Search Lists"
                            value=""
                            onChangeText={() => handleSearchList}
                            className="flex-1 text-[15px]"
                        />
                    </View>
                </View>


                <ListItems />


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

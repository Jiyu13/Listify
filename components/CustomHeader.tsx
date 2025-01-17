import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Lists from "@/components/lists/Lists";
import {ReactNativeModal} from "react-native-modal";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {CustomHeaderProps} from "@/types/type";

export default function CustomHeader(
    {headerText, searchText, children}: CustomHeaderProps)
{

    function handleGoBack(){}
    function handleMenuOpen() {}

    function handleSearchItem({text}: {text: string}){}

    return (
        <SafeAreaView className="flex h-full">
        <View className="p-5">
            <View className="mb-4">
                <View className="flex flex-row items-center justify-between h-20 ">
                    <TouchableOpacity onPress={handleGoBack}>
                        <Ionicons name="chevron-back" size={32} color="#3e4e50" />
                    </TouchableOpacity>
                    <Text className="text-3xl font-JakartaBold">{headerText}</Text>
                    <TouchableOpacity onPress={handleMenuOpen}>
                        <Ionicons name="add" size={32} color="#3e4e50" />
                    </TouchableOpacity>
                </View>

                {/* ======================== SEARCH BAR ===========================*/}
                <View className="flex flex-row justify-start items-center h-14 bg-secondary-300 rounded-2xl">
                    <Ionicons name="search" size={24} color="gray" className="mx-2.5"/>
                    <TextInput
                        placeholder={`Search ${searchText}`}
                        value=""
                        onChangeText={(text) => handleSearchItem(text)}
                        className="flex-1 text-tiny"
                    />
                </View>
            </View>

            {children}

        </View>
        </SafeAreaView>

    )
}

import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {Dispatch, SetStateAction} from "react";

export default function TabHeader({
  headerText, searchText, setShowAddForm, handleSearch
}: {
    headerText: string,
    searchText: string,
    setShowAddForm: Dispatch<SetStateAction<boolean>>,
    handleSearch: (text: string) => void
}) {
    return (
        <View className="mb-4">
            <View className="flex flex-row items-center justify-between h-20 ">

                <Text className="text-3xl font-JakartaBold">{headerText}</Text>

                <TouchableOpacity onPress={() => setShowAddForm(true)}>
                    <Ionicons name="add" size={32} color="#3e4e50" />
                </TouchableOpacity>
            </View>

            {/* ======================== SEARCH BAR ===========================*/}
            <View className="flex flex-row justify-start items-center h-14 bg-secondary-300 rounded-2xl">
                <Ionicons name="search" size={24} color="gray" className="mx-2.5"/>
                <TextInput
                    placeholder={`Search ${searchText}`}
                    value=""
                    onChangeText={(text) => handleSearch(text)}
                    className="flex-1 text-tiny"
                />
            </View>
        </View>
    )
}

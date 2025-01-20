import React, {Dispatch, SetStateAction} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function ScreenHeader({
     headerText, searchText, setShowAddForm, handleGoBack, searchInput, handleSearch
}: {
    headerText: string,
    searchText: string,
    setShowAddForm: Dispatch<SetStateAction<boolean>>,
    handleGoBack: () => void,
    searchInput: string,
    handleSearch: (text: string) => void
}) {
    return (
        <View className="mb-4">
            <View className="flex flex-row items-center justify-between h-20 ">

                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="chevron-back" size={32} color="#3e4e50" />
                </TouchableOpacity>

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
                    value={searchInput}
                    onChangeText={(text) => handleSearch(text)}
                    className="flex-1 text-tiny"
                />
            </View>
        </View>
    )
}

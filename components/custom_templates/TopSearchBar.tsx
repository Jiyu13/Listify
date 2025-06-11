import React from "react";
import {TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default function TopSearchBar(
    {searchInput, searchText, handleSearch}
    :
    {
        searchText: string,
        searchInput: string,
        handleSearch: (text: string) => void,
    }
) {
    return (
        <View className="flex flex-row justify-start items-center h-14 bg-secondary-300 rounded-2xl">
            <Ionicons name="search" size={24} color="gray" className="mx-2.5"/>
            <TextInput
                placeholder={`Search ${searchText}`}
                value={searchInput}
                onChangeText={(text) => handleSearch(text)}
                className="flex-1 text-tiny"
            />
        </View>
    )
}

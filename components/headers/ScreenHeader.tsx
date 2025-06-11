import React, {Dispatch, SetStateAction} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import HeaderTitle from "@/components/custom_templates/HeaderTitle";
import SearchBar from "@/components/custom_templates/TopSearchBar";
import TopSearchBar from "@/components/custom_templates/TopSearchBar";

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
            <HeaderTitle
                handleGoBack={handleGoBack}
                headerText={headerText}
                setShowAddForm={setShowAddForm}
            />

            <TopSearchBar
                searchInput={searchInput}
                searchText={searchText}
                handleSearch={handleSearch}
            />

        </View>
    )
}

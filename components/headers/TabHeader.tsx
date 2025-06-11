import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import React, {Dispatch, SetStateAction} from "react";
import HeaderTitle from "@/components/custom_templates/HeaderTitle";
import TopSearchBar from "@/components/custom_templates/TopSearchBar";

export default function TabHeader({
  headerText, searchText, setShowAddForm,searchInput,  handleSearch
}: {
    headerText: string,
    searchText: string,
    setShowAddForm: Dispatch<SetStateAction<boolean>>,
    searchInput: string,
    handleSearch: (text: string) => void
}) {
    return (
        <View className="mb-4">

            <HeaderTitle
                headerText={headerText}
                setShowAddForm={setShowAddForm}
            />

            {/* ======================== SEARCH BAR ===========================*/}
            <TopSearchBar
                searchInput={searchInput}
                searchText={searchText}
                handleSearch={handleSearch}
            />

        </View>
    )
}

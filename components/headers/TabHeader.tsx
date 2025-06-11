import {View} from "react-native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import React, {ComponentProps, Dispatch, SetStateAction} from "react";
import HeaderTitle from "@/components/custom_templates/HeaderTitle";
import TopSearchBar from "@/components/custom_templates/TopSearchBar";

export default function TabHeader({
  headerText, searchText, handleRightIconClick,searchInput,  handleSearch, rightIconName
}: {
    headerText: string,
    searchText: string,
    handleRightIconClick: Dispatch<SetStateAction<boolean>>,
    searchInput: string,
    handleSearch: (text: string) => void
    rightIconName: ComponentProps<typeof Ionicons>["name"]
}) {
    return (
        <View className="mb-4">

            <HeaderTitle
                headerText={headerText}
                handleRightIconClick={handleRightIconClick}
                rightIconName={rightIconName}
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

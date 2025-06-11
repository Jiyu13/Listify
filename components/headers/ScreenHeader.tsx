import React, {ComponentProps, Dispatch, SetStateAction} from "react";
import {View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import HeaderTitle from "@/components/custom_templates/HeaderTitle";
import TopSearchBar from "@/components/custom_templates/TopSearchBar";

export default function ScreenHeader({
     headerText, searchText, handleRightIconClick, handleGoBack, searchInput, handleSearch, rightIconName
}: {
    headerText: string,
    searchText: string,
    handleRightIconClick: Dispatch<SetStateAction<boolean>>,
    handleGoBack: () => void,
    searchInput: string,
    handleSearch: (text: string) => void
    rightIconName: ComponentProps<typeof Ionicons>["name"]
}) {
    return (
        <View className="mb-4">
            <HeaderTitle
                handleGoBack={handleGoBack}
                headerText={headerText}
                handleRightIconClick={handleRightIconClick}
                rightIconName={rightIconName}
            />

            <TopSearchBar
                searchInput={searchInput}
                searchText={searchText}
                handleSearch={handleSearch}
            />

        </View>
    )
}

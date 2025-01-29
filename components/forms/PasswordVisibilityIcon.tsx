import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default function PasswordVisibilityIcon({
     handleRightIconClick, iconName
} :{
    handleRightIconClick: () => void
    iconName: string
}) {
    // @ts-ignore
    return (
        (
            <TouchableOpacity
                onPress={handleRightIconClick}
                className="flex items-center justify-center px-4"
            >
                <Ionicons
                    // @ts-ignore
                    name={iconName}
                    size={28}/>
            </TouchableOpacity>
        )
    )
}

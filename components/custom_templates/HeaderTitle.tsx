import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {Dispatch, SetStateAction} from "react";

export default function HeaderTitle(
    {handleGoBack, headerText, setShowAddForm}
    :
    {
        headerText: string,
        setShowAddForm: Dispatch<SetStateAction<boolean>>,
        handleGoBack?: () => void,
    }
) {
    return (
        <View className="flex flex-row items-center justify-between pb-4">

            {handleGoBack &&
                <TouchableOpacity onPress={handleGoBack}>
                    <Ionicons name="chevron-back" size={28} color="#3e4e50" />
                </TouchableOpacity>
            }


            <Text className="text-2xl font-JakartaBold">{headerText}</Text>

            <TouchableOpacity onPress={() => setShowAddForm(true)}>
                <Ionicons name="add" size={28} color="#3e4e50" />
            </TouchableOpacity>
        </View>
    )
}

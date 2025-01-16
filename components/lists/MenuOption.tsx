import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {menuOption} from "@/types/type";

export default function MenuOption({option}: {option: menuOption}) {
    return (
        <View
            className=""
        >
            <TouchableOpacity
                // onPress={() => { setModalVisible(false); }}
            >
                <Text
                    className="text-tiny text-center mx-4 py-5 border-secondary-200 "
                    style={{borderBottomWidth: 0.5}}
                >
                    {option.description}
                </Text>
            </TouchableOpacity>
        </View>

    )
}

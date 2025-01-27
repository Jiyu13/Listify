import {Text, TouchableOpacity} from "react-native";
import React from "react";

export default function ModalButton({
        handleOnPress, buttonText, buttonStyle
} : {
    handleOnPress: () => void,
    buttonText: string,
    buttonStyle: string
}) {
    return (
        <TouchableOpacity onPress={handleOnPress}>
            <Text
                className={`text-tiny text-center mx-4 py-5 border-secondary-200 ${buttonStyle}`}
                style={{borderBottomWidth: 0.5}}
            >
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

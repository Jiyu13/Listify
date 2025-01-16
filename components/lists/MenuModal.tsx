import React, {Dispatch, SetStateAction} from "react";
import {ReactNativeModal} from "react-native-modal";
import {Text, TouchableOpacity, View} from "react-native";

export default function MenuModal(
    {isModalVisible, setModalVisible}: {
        isModalVisible: boolean
        setModalVisible: Dispatch<SetStateAction<boolean>>
    }
) {

    return (
        <ReactNativeModal
            isVisible={isModalVisible}
            // onModalHide={() => setModalVisible(false)}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setModalVisible(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setModalVisible(false)} // for Android, handles back button press
            style={{margin: 0, justifyContent: "flex-end",}}
        >
            <View
                className="bg-white px-7 py-9l h-80"
                style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1, minHeight: 200}}
            >
                <TouchableOpacity onPress={() => { setModalVisible(false); }}>
                    <Text>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible(false); }}>
                    <Text>Add item</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible(false); }}>
                    <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setModalVisible(false); }}>
                    <Text>Cancel</Text>
                </TouchableOpacity>

            </View>
        </ReactNativeModal>
    )

}

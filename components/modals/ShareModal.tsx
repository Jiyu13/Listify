import {ReactNativeModal} from "react-native-modal";
import {Text, TouchableOpacity, View} from "react-native";
import React, {Dispatch, SetStateAction} from "react";

export default function ShareModal(
    {isShareModalVisible, setShareModalVisible, handleShareCode, handleShareEmail, sharedCode}: {
        isShareModalVisible: boolean,
        setShareModalVisible: Dispatch<SetStateAction<boolean>>,
        handleShareCode: () => void,
        handleShareEmail: () => void,
        sharedCode: string,
    }
) {
    return (
        <ReactNativeModal
            isVisible={isShareModalVisible}
            // onModalHide={() => setModalVisible(false)}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setShareModalVisible(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setShareModalVisible(false)} // for Android, handles back button press
            style={{margin: 0, justifyContent: "flex-end",}}
        >
            <View
                className="bg-white px-4 min-h-52"
                style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1}}
            >
                <Text
                    className="text-tiny  mx-4 py-5 border-secondary-200 "
                    style={{borderBottomWidth: 0.5}}
                >
                    Share with
                </Text>
                <TouchableOpacity onPress={handleShareCode}>
                    <Text
                        className="text-tiny text-center mx-4 py-5 border-secondary-200 "
                        style={{borderBottomWidth: 0.5}}
                    >
                        Code: <Text className="text-tiny color-primary-500">{sharedCode}</Text>
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={handleShareEmail}>
                    <Text
                        className="text-tiny text-center mx-4 py-5 border-secondary-200 "
                        style={{borderBottomWidth: 0.5}}
                    >
                        Email
                    </Text>
                </TouchableOpacity>

            </View>
        </ReactNativeModal>
    )

}

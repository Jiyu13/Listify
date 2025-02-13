import React, {Dispatch, SetStateAction} from "react";
import {ReactNativeModal} from "react-native-modal";
import {View} from "react-native";

export default function CustomBottomModal({
   isModalVisible, setModalVisible, children
}: {
   isModalVisible: boolean,
   setModalVisible: Dispatch<SetStateAction<boolean>>,
   children: React.ReactNode
}
) {

    return (
        <ReactNativeModal
            isVisible={isModalVisible}
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
                className="bg-white px-4 min-h-50"
                style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1}}
            >
                {children}
            </View>
        </ReactNativeModal>
    )

}

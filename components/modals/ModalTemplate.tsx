import {ReactNativeModal} from "react-native-modal";
import React, {Dispatch, SetStateAction} from "react";
import {ViewStyle} from "react-native";

export default function ModalTemplate(
    {isModalVisible, setModalVisible, children, modalStyle}:
    {
        isModalVisible: boolean,
        setModalVisible: Dispatch<SetStateAction<boolean>>,
        children: React.ReactNode,
        modalStyle?: ViewStyle,
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
            style={ // <- use provided style or fallback
                    modalStyle ?? {
                    margin: 0, // <-- Critical: removes default margin
                    justifyContent: 'center',
                }
            }
            statusBarTranslucent={true} // <-- Critical for Android to allow modal under status bar
        >
            {children}
        </ReactNativeModal>
    )
}

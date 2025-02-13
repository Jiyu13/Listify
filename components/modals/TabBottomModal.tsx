import React, {Dispatch, SetStateAction} from "react";
import {ReactNativeModal} from "react-native-modal";
import {View} from "react-native";
import ModalButton from "@/components/buttons/ModalButton";

export default function TabBottomModal({
   isModalVisible, setModalVisible, handleEditList, handleDeleteList, handleShareList,
   handleShowConfirmDelete
}: {
    isModalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    handleEditList: () => void,
    handleDeleteList: () => void,
    handleShareList: () => void
    handleShowConfirmDelete: () => void
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
                className="bg-white px-4 min-h-52"
                style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1}}
            >
                <ModalButton
                    handleOnPress={handleEditList}
                    buttonText='Edit'
                    buttonStyle=''
                />
                <ModalButton
                    handleOnPress={handleShareList}
                    buttonText='Share'
                    buttonStyle=''
                />
                <ModalButton
                    handleOnPress={handleShowConfirmDelete}
                    buttonText='Delete'
                    buttonStyle='text-danger-700'
                />
                <ModalButton
                    handleOnPress={() => setModalVisible(false)}
                    buttonText='Cancel'
                    buttonStyle=''
                />

            </View>
        </ReactNativeModal>
    )

}

import React, {Dispatch, SetStateAction} from "react";
import {ReactNativeModal} from "react-native-modal";
import {Text, TouchableOpacity, View} from "react-native";
import ModalButton from "@/components/buttons/ModalButton";

export default function TabBottomModal(
    {isModalVisible, setModalVisible, handleEditList, handleDeleteList, handleShareList}: {
        isModalVisible: boolean,
        setModalVisible: Dispatch<SetStateAction<boolean>>,
        handleEditList: () => void,
        handleDeleteList: () => void,
        handleShareList: () => void
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
                    handleOnPress={handleDeleteList}
                    buttonText='Delete'
                    buttonStyle='text-danger-700'
                />
                <ModalButton
                    handleOnPress={() => setModalVisible(false)}
                    buttonText='Cancel'
                    buttonStyle=''
                />
                {/*<TouchableOpacity onPress={handleEditList}>*/}
                {/*    <Text*/}
                {/*        className="text-tiny text-center mx-4 py-5 border-secondary-200 "*/}
                {/*        style={{borderBottomWidth: 0.5}}*/}
                {/*    >*/}
                {/*        Edit list*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={handleShareList}>*/}
                {/*    <Text*/}
                {/*        className="text-tiny text-center mx-4 py-5 border-secondary-200 "*/}
                {/*        style={{borderBottomWidth: 0.5}}*/}
                {/*    >*/}
                {/*        Share*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={handleDeleteList}>*/}
                {/*    <Text*/}
                {/*        className="text-tiny text-center mx-4 py-5 border-secondary-200 "*/}
                {/*        style={{borderBottomWidth: 0.5}}*/}
                {/*    >*/}
                {/*        Delete*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => { setModalVisible(false); }}>*/}
                {/*    <Text*/}
                {/*        className="text-tiny text-center mx-4 py-5 border-secondary-200 "*/}
                {/*        style={{borderBottomWidth: 0.5}}*/}
                {/*    >*/}
                {/*        Cancel*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}

            </View>
        </ReactNativeModal>
    )

}

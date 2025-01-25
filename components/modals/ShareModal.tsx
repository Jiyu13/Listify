import {ReactNativeModal} from "react-native-modal";
import {Alert, Platform, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import React, {Dispatch, SetStateAction, useState} from "react";
import * as Clipboard from 'expo-clipboard';
export default function ShareModal(
    {isShareModalVisible, setShareModalVisible, handleShareEmail, sharedCode}: {
        isShareModalVisible: boolean,
        setShareModalVisible: Dispatch<SetStateAction<boolean>>,
        handleShareEmail: () => void,
        sharedCode: string,
    }
) {

    const [isCopied, setIsCopied] = useState(false)
    async function handleLongPress() {
        await Clipboard.setStringAsync(sharedCode)

        setIsCopied(true);

        if (Platform.OS === 'android') {
            ToastAndroid.show('Copied!', ToastAndroid.SHORT);
        } else if (Platform.OS === 'ios') {
            Alert.alert('Copied!');
        }

        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }


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
                <TouchableOpacity onLongPress={handleLongPress}>
                    <Text
                        className="text-tiny text-center mx-4 py-5 border-secondary-200 "
                        style={{borderBottomWidth: 0.5}}
                    >
                        Code: <Text className="text-tiny color-primary-500">{sharedCode}</Text>
                    </Text>

                </TouchableOpacity>

                {/*{isCopied && <Text>Copied!</Text>}*/}


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

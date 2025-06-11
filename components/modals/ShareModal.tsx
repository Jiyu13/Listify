import {Alert, Platform, Text, ToastAndroid, View} from "react-native";
import React, {useState} from "react";
import * as Clipboard from 'expo-clipboard';
import ModalButton from "@/components/buttons/ModalButton";
export default function ShareModal(
    {sharedCode,  handleShareByClick} : {
        sharedCode: string,
        handleShareByClick: (text: string) => void,
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

            <View
                className="bg-white px-4 min-h-52"
                style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1}}
            >
                <Text
                    className="text-tiny  mx-4 py-5 border-secondary-200 "
                    style={{borderBottomWidth: 0.5}}
                >
                    Invite collaborators
                </Text>

                {/*<ModalButton*/}
                {/*    handleOnPress={handleLongPress}*/}
                {/*    buttonText='Copy code'*/}
                {/*    buttonStyle=''*/}
                {/*/>*/}
                <ModalButton
                    handleOnPress={() => handleShareByClick('username')}
                    buttonText='By username'
                    buttonStyle=''
                />
                <ModalButton
                    handleOnPress={() => handleShareByClick('email')}
                    buttonText='By email'
                    buttonStyle=''
                />

            </View>
    )

}

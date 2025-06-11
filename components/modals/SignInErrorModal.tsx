import {Text, View} from "react-native";
import FormButton from "@/components/buttons/FormButton";
import {ReactNativeModal} from "react-native-modal";
import React, {Dispatch, SetStateAction} from "react";

export default function SignInErrorModal({isShowSignInError, setShowSignInError, signInError, setSignInError}: {
     isShowSignInError: boolean,
     setShowSignInError: Dispatch<SetStateAction<boolean>>,
     signInError: string,
     setSignInError: Dispatch<SetStateAction<string>>
}) {

     function handleCloseErrorModal() {
         setShowSignInError(false)
         setSignInError('')
    }
    return (
        <ReactNativeModal
            isVisible={isShowSignInError}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setShowSignInError(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setShowSignInError(false)} // for Android, handles back button press
        >
            <View className="bg-white m-4 px-7 py-9 rounded-2xl min-h-[300px] justify-center">
                <Text className="text-xl text-primary-900 font-JakartaBold my-5 text-center">
                    {signInError}
                </Text>


                <FormButton
                    buttonText="OK"
                    onPress={handleCloseErrorModal}
                    textVariant='onboarding'
                    bgVariant='onboarding'
                />
            </View>
        </ReactNativeModal>
    )
}

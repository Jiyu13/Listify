import {Text, View} from "react-native";
import FormButton from "@/components/buttons/FormButton";
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
    )
}

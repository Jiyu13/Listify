import {Text, TouchableOpacity, View} from "react-native";
import {ReactNativeModal} from "react-native-modal";
import React, {Dispatch, SetStateAction, useContext} from "react";
import {useAuth} from "@clerk/clerk-expo";
import {Context} from "@/components/Context";
import {useRouter} from "expo-router";

export default function LogoutModal({isLogout, setIsLogout} : {
    isLogout: boolean,
    setIsLogout: Dispatch<SetStateAction<boolean>>
}) {

    const { signOut } = useAuth()
    const {setAppUser, setUserLists} = useContext(Context)


    const router = useRouter();
    async function handleConfirmLogout() {

        try {
            await signOut();
            setIsLogout(false)
            setAppUser([])
            setUserLists([])

            router.replace("/(auth)/welcome")
            console.log("Signed out successfully!");
        } catch (err: any) {
            console.error("Error during sign-out:", err);
        }
    }

    return (
        <ReactNativeModal
            isVisible={isLogout}
            // onModalHide={() => setModalVisible(false)}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={() => setIsLogout(false)}  // close modal if clicking outside <View>
            onBackButtonPress={() => setIsLogout(false)} // for Android, handles back button press
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
                    Confirm to log out this account?
                </Text>


                <TouchableOpacity onPress={handleConfirmLogout}>
                    <Text
                        className="text-tiny text-center mx-4 py-5 border-secondary-200  text-danger-700"
                        style={{borderBottomWidth: 0.5}}
                    >
                        Log out
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsLogout(false)}>
                    <Text
                        className="text-tiny text-center mx-4 py-5 border-secondary-200"
                        style={{borderBottomWidth: 0.5}}
                    >
                        Cancel
                    </Text>
                </TouchableOpacity>

            </View>
        </ReactNativeModal>
    )
}

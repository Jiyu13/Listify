import {Text, View} from "react-native";
import {ReactNativeModal} from "react-native-modal";
import React, {Dispatch, SetStateAction, useContext} from "react";
import {useAuth} from "@clerk/clerk-expo";
import {Context} from "@/components/Context";
import {useRouter} from "expo-router";
import ModalButton from "@/components/buttons/ModalButton";

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
                <ModalButton
                    handleOnPress={handleConfirmLogout}
                    buttonText='Log out'
                    buttonStyle='text-danger-700'
                />
                <ModalButton
                    handleOnPress={() => setIsLogout(false)}
                    buttonText='Cancel'
                    buttonStyle=''
                />

            </View>
    )
}

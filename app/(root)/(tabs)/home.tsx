import {View, Text} from "react-native";
import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Page() {
    const {user} = useUser()
    const [testMessage, setTestMessage] = useState('');

    console.log("Home Page Loaded");
    console.log(user?.emailAddresses[0].emailAddress)

    useEffect(() => {
        axios('http://192.168.1.168:5000/api/v1/listify')
            .then(res => {
                setTestMessage(res.data.message)
            })
            .catch(error => {
                console.error("Error fetching data", error)}
            )
    }, [])

    return (
        <SafeAreaView>
            <SignedIn>
                <Text>hello {user?.emailAddresses[0].emailAddress}</Text>
            </SignedIn>
            <SignedOut>
                <Link href="../../(auth)/sign-in">
                    <Text>Sign In</Text>
                </Link>
                <Link href="../../(auth)/sign-in">
                    <Text>Sign Up</Text>
                </Link>
            </SignedOut>
        </SafeAreaView>
    )
}

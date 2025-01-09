import {View, Text} from "react-native";
import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {Link} from "expo-router";

export default function Page() {
    const {user} = useUser()

    return (
        <View>
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

        </View>
    )
}

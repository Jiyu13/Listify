import {Redirect} from "expo-router";
import "../global.css"
import {useAuth} from "@clerk/clerk-expo";


export default function App() {
    const { isSignedIn } = useAuth()

    if (isSignedIn) {
        return  <Redirect href="/(root)/(tabs)/home"/>
    }
    return (
        // <SafeAreaView>
        //     <StatusBar hidden={false} />
        //     <Redirect href="(auth)/welcome" />
        // </SafeAreaView>
        <Redirect href="./(auth)/welcome"/>
    )
}

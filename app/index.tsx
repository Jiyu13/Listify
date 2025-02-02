import {Redirect} from "expo-router";
import "../global.css"
import {useAuth, useUser} from "@clerk/clerk-expo";
import {useContext, useEffect} from "react";
import {AxiosResponse} from "axios/index";
import {User} from "@/types/type";
import api from "@/api";
import {Context} from "@/components/Context";
// import { verifyInstallation } from 'nativewind';


export default function App() {
    // verifyInstallation()   // to help confirm that the package has been correctly installed

    const { isLoaded, isSignedIn } = useAuth()
    const {user} = useUser()
    const {setAppUser, appUser} = useContext(Context)

    useEffect(() => {
        const fetchUserByEmail = async () => {

            if (isLoaded && isSignedIn && user?.emailAddresses[0].emailAddress) {
                try {
                    const email = user?.emailAddresses[0].emailAddress;
                    const response: AxiosResponse<User> = await api.get(`/users/email/${email}`);
                    setAppUser(response.data);
                } catch (error) {
                    console.error("Index: Error fetching user by email:", error);
                }
            }
        };

        fetchUserByEmail();
    }, [isSignedIn, user, isLoaded]);

    console.log("index-------------", appUser)

    if (isLoaded && isSignedIn && user?.emailAddresses[0].emailAddress) {
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

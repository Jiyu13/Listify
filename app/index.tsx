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

    const { isSignedIn } = useAuth()
    const {user} = useUser()
    const {setAppUser, appUser} = useContext(Context)

    useEffect(() => {
        const fetchUserByEmail = async () => {
            if (isSignedIn) {
                try {
                    const email = user?.emailAddresses[0].emailAddress;
                    const response: AxiosResponse<User> = await api.get(`/users/${email}`);
                    setAppUser(response.data);
                } catch (error) {
                    console.error("Error fetching user by email:", error);
                }
            }
        };

        fetchUserByEmail();
    }, [isSignedIn, user]);

    console.log("index-------------", appUser)

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

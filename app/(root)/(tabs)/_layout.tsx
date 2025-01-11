import {Stack, Tabs} from 'expo-router';
import {Image, View} from "react-native";

function TabIcon() {
    return (
        <View>
            <View>
                <Image source={"/"}/>
            </View>
        </View>
    )

}

export default function RootTabsLayout() {

    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                tabBarActiveTintColor: "white",
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: () => <TabIcon />
                }}
            />
            <Tabs.Screen
                name="rides"
                options={{
                    title: "Rides",
                    headerShown: false,
                    tabBarIcon: () => <TabIcon />

                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    headerShown: false,
                    tabBarIcon: () => <TabIcon />

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: () => <TabIcon  />

                }}
            />
        </Tabs>
    )
}

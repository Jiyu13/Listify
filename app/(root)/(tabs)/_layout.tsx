import {Stack, Tabs} from 'expo-router';
import {Image, ImageSourcePropType, View} from "react-native";
import {icons} from "@/constants"


function TabIcon({source, focused}: { source: ImageSourcePropType, focused: boolean }) {
    return (
        <View
            className={`flex justify-center items-center ${focused ? "bg-general-300" : ""}`}  // white
        >
            <View
                className={`w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`} // green
            >
                <Image
                    source={source}
                    tintColor="white"
                    resizeMode="contain"
                    className="w-7 h-7"
                />
            </View>
        </View>
    )

}

export default function RootTabsLayout() {

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    height: 68,
                    overflow: "hidden",
                    justifyContent: 'space-around',
                    alignItems: "center",
                    paddingVertical: 0
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({focused, }) => (
                        <TabIcon focused={focused} source={icons.list}/>
                    )

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} source={icons.profile}/>
                    )
                }}
            />

        </Tabs>
    )
}

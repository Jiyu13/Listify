import {Tabs} from 'expo-router';
import {ImageSourcePropType, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {icons} from "@/constants"
import { MaterialIcons } from "@expo/vector-icons";

function TabIcon({iconName, source, focused}: { source: ImageSourcePropType, focused: boolean, iconName: string }) {
    return (
        <View className={`flex justify-center items-center`}>
            <View>
                <MaterialIcons
                    // @ts-ignore
                    name={iconName as string}
                    size={30}
                    color={focused ? "#0CC25F" : "#858585"}
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
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 68,
                    overflow: "hidden",
                    justifyContent: 'space-around',
                    alignItems: "center",
                    paddingVertical: 0,
                    paddingBottom: 0, // ios only
                },
                tabBarItemStyle: {
                    height: '100%',
                },
                tabBarIconStyle: {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginBottom: 0,
                },
                tabBarLabelStyle: {
                    marginTop: 0,
                    paddingBottom: 15, // Label'ı aşağıya itmek için
                },
                // @ts-ignore
                tabBarButton: (props) => <TouchableOpacity {...props} />,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Lists",
                    headerShown: false,
                    tabBarIcon: ({focused, }) => (
                        <TabIcon focused={focused} source={icons.list} iconName="post-add"/>
                    )

                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon focused={focused} source={icons.profile} iconName="account-circle"/>
                    )
                }}
            />

        </Tabs>
    )
}

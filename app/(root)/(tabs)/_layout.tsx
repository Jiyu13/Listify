import {Tabs} from 'expo-router';
import {ImageSourcePropType, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {icons} from "@/constants"
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


function TabIcon({iconName, source, focused}: { source: ImageSourcePropType, focused: boolean, iconName: string }) {
    return (
        <View className={`flex justify-center items-center`}>
            <View>
                <MaterialIcons
                    // @ts-ignore
                    name={iconName as string}
                    size={30}
                    color={focused ? "#3e4e50" : "#D9D9D9"}
                />
            </View>
        </View>

    )

}

export default function RootTabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "#3e4e50",
                tabBarInactiveTintColor: "#D9D9D9",
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: 68 + insets.bottom,
                    overflow: "hidden",
                    justifyContent: 'space-around',
                    alignItems: "center",
                    paddingVertical: 0,
                    paddingBottom: insets.bottom, // ios only
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
                    // paddingBottom: 15, // Label'ı aşağıya itmek için
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

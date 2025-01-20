import {Stack} from "expo-router";

export default function ListItemsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="[id]/[name]"
                options={{
                    headerShown: false
                }}

                // define a custom header for all screens in this route
                // see [name].tsx, can also use useNavigation + useEffect
                // options={({ route }) => ({
                //     header: () => (<CustomPageTemplate headerText={route.params?.name} searchText="item"/>),
                // })}

            />
        </Stack>
    )
}

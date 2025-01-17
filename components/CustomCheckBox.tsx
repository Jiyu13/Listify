import {Pressable, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {CustomCheckBoxProps} from "@/types/type";

export default function CustomCheckBox(props: CustomCheckBoxProps) {

    const iconName = props.isChecked ? "checkbox-marked" : "checkbox-blank-outline"

    return (
        <View>
            <Pressable onPress={props.handleCheck}>
                <MaterialCommunityIcons name={iconName} size={26} color="#000"/>
            </Pressable>
        </View>
    )
}

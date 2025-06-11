import {View} from "react-native";
import React from "react";
import {CustomPageProps} from "@/types/type";

export default function CustomPageTemplate(
    {header, children, form}: CustomPageProps)
{

    return (
        <View className="flex-1  pt-10 px-5">
            {header}

            {children}

            {form}

        </View>
    )
}

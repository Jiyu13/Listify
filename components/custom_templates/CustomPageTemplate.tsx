import {View} from "react-native";
import React from "react";
import {CustomPageProps} from "@/types/type";

export default function CustomPageTemplate(
    {header, children, form}: CustomPageProps)
{

    return (
        <View className="flex-1  pt-5 px-5 bg-yellow-200">
            {header}

            {children}

            {form}

        </View>
    )
}

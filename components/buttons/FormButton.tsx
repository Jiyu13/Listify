import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {FormButtonProps} from "@/types/type";

function getBgVariantStyle(variant: FormButtonProps["bgVariant"])  {
    // Accept a variant of type "ButtonProps"
    switch (variant) {
        case "secondary":
            return "bg-gray-500";
        case "danger":
            return "bg-red-500";
        case "success":
            return "bg-green-500";
        case "outline":
            return "bg-transparent border-[#3e4e50] border";
        default:
            return "bg-splash-100";
    }
}

function getTextVariantStyle(variant: FormButtonProps["textVariant"]) {
    // Accept a variant of type "ButtonProps"
    switch (variant) {
        case "primary":
            return "text-black";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-green-100";
        default:
            return "text-customText-logo";
    }
};
export default function FormButton({
    onPress, buttonText, IconLeft, IconRight,
    bgVariant = "primary", textVariant = "default", className="mt-6",
   ...props
}: FormButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{borderRadius: 12}}
            className={
                `w-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 
                ${getBgVariantStyle(bgVariant)} ${className}`
            }
            {...props}
        >
            {IconLeft && <IconLeft />}

            <Text className={`p-4 text-lg font-JakartaSemiBold ${getTextVariantStyle(textVariant)}`}>
                {buttonText}
            </Text>

            {IconRight && <IconRight />}

        </TouchableOpacity>
    )
}

import {Text, TouchableOpacity} from "react-native";
import {ButtonProps} from "@/types/type";

function getBgVariantStyle(variant: ButtonProps["bgVariant"])  {
    // Accept a variant of type "ButtonProps"
    switch (variant) {
        case "secondary":
            return "bg-gray-500";
        case "danger":
            return "bg-red-500";
        case "success":
            return "bg-green-500";
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]";
        default:
            return "bg-[#0286FF]";
    }
};

function getTextVariantStyle(variant: ButtonProps["textVariant"]) {
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
            return "text-white";
    }
};
export default function CustomButton({
        onPress,
        title,
        bgVariant = "primary",
        textVariant = "default",
        IconLeft,
        IconRight,
        className,
        ...props
    }: ButtonProps) {
    // ({...}: ButtonProps) destructure the props passed to CustomButton, specifies their types as ButtonPros
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`w-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
            {...props}
        >
            {IconLeft && <IconLeft />}
            <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
                {title}
            </Text>
            {IconRight && <IconRight />}
        </TouchableOpacity>
    );
}

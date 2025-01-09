import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {InputFieldProps} from "@/types/type";

export default function InputField({
       label, name, icon,
       labelStyle,
       secureTextEntry=false,
       containerStyle,
       inputStyle,
       iconStyle,
       className,
        ...props
    }: InputFieldProps) {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className="my-2 w-full">
                    <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle} text-primary-900`}>
                        {label}
                    </Text>
                    <View className={`flex flex-row justify-start items-center relative bg-neutral-100 border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
                        {icon && (
                            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
                        )}
                        <TextInput
                            className={`p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
                            secureTextEntry={secureTextEntry}
                            {...props}
                        >

                        </TextInput>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

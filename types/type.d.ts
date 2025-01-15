import {TextInputProps, TouchableOpacityProps} from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
    // inherit all the props from TouchableOpacity component, also add the following custom props
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";  // optional bgVariant property
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success"; // optional textVariant property
    IconLeft?: React.ComponentType<any>; // optional IconLeft property, expects a React component tht will render an icon to the left of the button text
    IconRight?: React.ComponentType<any>;
    className: string; // optional className property
}


declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
}

declare interface List {
    name: string;
    item_counts: number;
    created_at: string;
    share?: boolean;
}

declare interface User {
    username: string;
    email: string;
    created_at: string;
}

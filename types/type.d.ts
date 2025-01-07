import {TouchableOpacityProps} from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
    // inherit all the props from TouchableOpacity component, also add the following custom props
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";  // optional bgVariant property
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success"; // optional textVariant property
    IconLeft?: React.ComponentType<any>; // optional IconLeft property, expects a React component tht will render an icon to the left of the button text
    IconRight?: React.ComponentType<any>;
    className: string; // optional className property
}

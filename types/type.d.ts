import {TextInputProps, TouchableOpacityProps} from "react-native";
import React, {Dispatch, SetStateAction} from "react";

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

declare interface CustomPageProps {
    headerType: string;
    headerText: string;
    headerStyle: string;
    searchText: string
    listId?: number;
    state?: any;
    setter?: Dispatch<SetStateAction<any[]>>;
    showAddForm: boolean;
    setShowAddForm: Dispatch<SetStateAction<boolean>>;
    header: React.ReactNode;
    children: React.ReactNode;
    form: React.ReactNode;
}

declare interface CustomCheckBoxProps {
    isChecked: boolean;
    handleCheck: () => void;
    // children: React.ReactNode;
}
declare interface CustomMenuModalProps {
    isVisible: boolean;
    handleOpenModal?: () => void;
    handleDeleteItem?: () => void;
    modalHeight?: number;
    options: string[];
}

declare interface menuOption {
    id: number;
    description: string;
    // handleOnPress: () => void
}

declare interface List {
    id?: number;
    name: string;
    item_counts?: number;
    created_at?: string;
    share?: boolean;
    item_count: number;
}
declare interface ListItem {
    id?: number;
    description: string;
    units: string;
    checked?: boolean;
    list_id?: number;
}

declare interface User {
    username: string;
    email: string;
    created_at: string;
}

// ================================= icons ==============================================
// @ts-ignore
import google from "@/assets/icons/google.png";
// @ts-ignore
import lock from "@/assets/icons/lock.png"
// @ts-ignore
import list from "@/assets/icons/list.png"
// @ts-ignore
import profile from "@/assets/icons/profile.png"
export const icons = {
    google, lock, list, profile
}
// ======================================== ICON NAMES ==========================================
import {Platform} from "react-native";

const platform = Platform.OS === "ios"
export const ellipsis = platform ? "ellipsis-horizontal" : "ellipsis-vertical"
export const share = platform ? "share-outline" : "share-social-outline"
// ======================================== IMAGES ==============================================
// @ts-ignore
import check from "@/assets/images/check.png";
export const images = {
    check
};

export const menuOptions = [
    {
        id: 1,
        description:
            "Rename list",
    },
    {
        id: 2,
        description: "Add item"
    },
    {
        id: 3,
        description: "Delete",
    },
    {
        id: 4,
        description: "cancel"
    },
];

export const data = {
    menuOptions,
};

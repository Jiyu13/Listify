import ModalButton from "@/components/buttons/ModalButton";
import React, {Dispatch, SetStateAction} from "react";
import {View} from "react-native";

export default function ItemCardMenuModal({
     itemId, setModalVisible, handleDeleteClick, handleEditClick
}: {
    itemId: number
    setModalVisible: Dispatch<SetStateAction<boolean>>
    handleDeleteClick: () => void,
    handleEditClick: (itemId: number) => void
}) {

    return (
        <View
            className="flex bg-white px-4 min-h-52"
            style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1, justifyContent: 'flex-end', margin: 0}}
        >
            <ModalButton
                handleOnPress={() => handleEditClick(itemId)}
                buttonText='Edit'
                buttonStyle=''
            />
            <ModalButton
                handleOnPress={handleDeleteClick}
                buttonText='Delete'
                buttonStyle='text-danger-700'
            />
            <ModalButton
                handleOnPress={() => setModalVisible(false)}
                buttonText='Cancel'
                buttonStyle=''
            />
        </View>
    )
}

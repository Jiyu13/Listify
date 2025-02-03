import ModalButton from "@/components/buttons/ModalButton";
import React, {Dispatch, SetStateAction} from "react";

export default function ItemCardModalOptions({
     itemId, setModalVisible, handleDeleteClick, handleEditClick
}: {
    itemId: number
    setModalVisible: Dispatch<SetStateAction<boolean>>
    handleDeleteClick: () => void,
    handleEditClick: (itemId: number) => void
}) {

    return (
        <>
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
        </>
    )
}

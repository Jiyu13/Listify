import ModalButton from "@/components/buttons/ModalButton";
import React, {Dispatch, SetStateAction} from "react";

export default function ItemCardModalOptions({
     setModalVisible, handleDeleteClick,
}: {
    setModalVisible: Dispatch<SetStateAction<boolean>>
    handleDeleteClick: () => void,
}) {

    function handleEditList() {}
    return (
        <>
            <ModalButton
                handleOnPress={handleEditList}
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

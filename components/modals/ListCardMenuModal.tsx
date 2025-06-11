import React, {Dispatch, SetStateAction} from "react";
import {View} from "react-native";
import ModalButton from "@/components/buttons/ModalButton";

export default function ListCardMenuModal({
   setListCardMenuVisible, handleEditList, handleShareList,
   handleShowConfirmDelete
}: {
    setListCardMenuVisible: Dispatch<SetStateAction<boolean>>,
    handleEditList: () => void,
    handleShareList: () => void
    handleShowConfirmDelete: () => void
    }
) {



    return (
        <View
            className="flex bg-white px-4 min-h-52"
            style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1, justifyContent: 'flex-end', margin: 0}}
        >
            <ModalButton
                handleOnPress={handleEditList}
                buttonText='Edit'
                buttonStyle=''
            />
            <ModalButton
                handleOnPress={handleShareList}
                buttonText='Share'
                buttonStyle=''
            />
            <ModalButton
                handleOnPress={handleShowConfirmDelete}
                buttonText='Delete'
                buttonStyle='text-danger-700'
            />
            <ModalButton
                handleOnPress={() => setListCardMenuVisible(false)}
                buttonText='Cancel'
                buttonStyle=''
            />

        </View>
    )

}

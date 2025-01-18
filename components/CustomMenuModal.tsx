import React, {Dispatch, SetStateAction} from "react";
import {ReactNativeModal} from "react-native-modal";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import { CustomMenuModalProps} from "@/types/type";

export default function CustomMenuModal(props: CustomMenuModalProps) {

    return (
        <ReactNativeModal
            isVisible={props.isVisible}
            // onModalHide={() => setModalVisible(false)}
            backdropOpacity={0.3}
            backdropTransitionOutTiming={0} // Instantly remove the backdrop
            animationIn="slideInUp" // Controls how the modal appears
            animationOut="slideOutDown" // Controls how the modal disappears
            animationOutTiming={300} // Adjusts the duration of the closing animation
            onBackdropPress={props.handleOpenModal}  // close modal if clicking outside <View>
            onBackButtonPress={props.handleOpenModal} // for Android, handles back button press
            style={{margin: 0, justifyContent: "flex-end",}}
        >
            <View
                className="bg-white px-4"
                style={{borderTopLeftRadius: 24, borderTopRightRadius: 24, flexShrink: 1, height: 118}}
            >
                <FlatList
                    data={props.options}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={item === "Delete" ? props.handleDeleteItem : props.handleOpenModal}>
                                <Text
                                    className="text-tiny text-center mx-4 py-5 border-secondary-200 "
                                    style={{borderBottomWidth: 0.5}}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    keyExtractor={(option) => option}
                    showsVerticalScrollIndicator={false}
                    className="rounded-2xl" //  mb-36
                    contentContainerStyle={{ paddingBottom: 110 }}  // applies styles to the inner content of the FlatList, ensure the last item is fully visible above the tab bar
                />

                {/*<TouchableOpacity onPress={handleOpenModal}>*/}
                {/*    <Text*/}
                {/*        className="text-tiny text-center mx-4 py-5 border-secondary-200 "*/}
                {/*        style={{borderBottomWidth: 0.5}}*/}
                {/*    >*/}
                {/*        Add item*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={handleOpenModal}>*/}
                {/*    <Text*/}
                {/*        className="text-tiny text-center mx-4 py-5 border-secondary-200 "*/}
                {/*        style={{borderBottomWidth: 0.5}}*/}
                {/*    >*/}
                {/*        Delete*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={handleOpenModal}>*/}
                {/*    <Text*/}
                {/*        className="text-tiny text-center mx-4 py-5 border-secondary-200 "*/}
                {/*        style={{borderBottomWidth: 0.5}}*/}
                {/*    >*/}
                {/*        Cancel*/}
                {/*    </Text>*/}
                {/*</TouchableOpacity>*/}


            </View>
        </ReactNativeModal>
    )

}

import {List, ListItem} from "@/types/type";
import {View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {useContext, useEffect, useRef, useState} from "react";
import MenuModal from "@/components/lists/MenuModal";
import api from "@/api";
import {useAuth} from "@clerk/clerk-expo";
import {Context} from "@/components/Context";

export default function ListCard({ list}: { list: List }) {

    const { isSignedIn } = useAuth()
    const {setAppUser, appUser} = useContext(Context)
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [listItems, setListItems] = useState<ListItem[] | null>(null)  // an array if ListItm obj / null initilly

    useEffect(() => {
        const fetchListItemsByListId = async () => {
            if (isSignedIn && appUser) {
                try {
                    const list_id = list?.id
                    const response = await api.get(`/lists/${list_id}`)
                    setListItems(response.data)
                } catch (error) {
                    console.error("Error fetching list items:", error);
                }
            }
        }
        fetchListItemsByListId()
    }, [isSignedIn, appUser])

    // console.log("userlists----------------", listItems?.length)

    return (
        <View className="flex flex-row justify-between items-center p-4 border-b-[1px] border-secondary-300"
        >
            {/* ==========================Left Column============================ */}
            <View className="">

                <Text className="text-lg">{list.name}</Text>
                <Text className="text-secondary-700">{listItems?.length} items</Text>

                {list.share && (
                    <View className="flex flex-row justify-start items-center">
                        <Ionicons name="people-sharp" size={20} color="#0CC25F"  style={{marginRight: 4}}/>
                        <Text className="m-0 p-0 text-secondary-700">Shared</Text>
                    </View>

                )}

                <Text className="text-secondary-700 text-sm">{list.created_at}</Text>
            </View>

            {/* ==========================Right Column============================ */}
            <View style={{display: "flex"}}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex items-center justify-center"
                    style={{ flexShrink: 0}}
                >
                    <Ionicons name="ellipsis-horizontal" size={28}/>
                </TouchableOpacity>

            </View>

            <MenuModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
            />

            {/*<View>*/}
            {/*    <TouchableOpacity*/}
            {/*        onPress={handleToggleDropdown}*/}
            {/*        className="flex items-center justify-center"*/}
            {/*        // style={[styles.triggerStyle, {flexShrink: 0}]}*/}
            {/*    >*/}
            {/*        <Ionicons name="ellipsis-horizontal" size={24}/>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <DropdownMenu*/}
            {/*        isOpenDropdown={isOpenDropdown}*/}
            {/*        setIsOpenDropdown={setIsOpenDropdown}*/}
            {/*        handleClose={() => setIsOpenDropdown(false)}*/}
            {/*        handleOpen={() => setIsOpenDropdown(true)}*/}
            {/*    />*/}
            {/*</View>*/}

        </View>
    )
}

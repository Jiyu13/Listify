import {List, ListItem} from "@/types/type";
import {View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import TabMenuModal from "@/components/TabMenuModal";
import api from "@/api";
import {useAuth} from "@clerk/clerk-expo";
import {Context} from "@/components/Context";
import {Link, useRouter} from "expo-router";

export default function ListCard({
    list
}: {
    list: List,
}) {
    const router = useRouter();
    const { isSignedIn } = useAuth()

    const {setAppUser, appUser, } = useContext(Context)

    const [itemQuantity, setItemQuantity] = useState(0)
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(() => {
        const fetchListItemsByListId = async () => {
            if (isSignedIn && appUser) {
                try {
                    const list_id = list?.id
                    const response = await api.get(`/lists/${list_id}`)
                    setItemQuantity(response.data.length)
                } catch (error) {
                    console.error("Error fetching list items:", error);
                }
            }
        }
        fetchListItemsByListId()
    }, [isSignedIn, appUser])


    return (
        <View className="flex flex-row items-center p-4 border-b-[1px] border-secondary-300">
            {/* ==========================Left Column============================ */}
            <Link
                href={{
                    pathname: `/lists/[id]/[name]`,
                    params: { id: list?.id as number, name: list?.name },
                }}
                  className="flex-1"
            >
                <View>
                    <Text className="text-lg">{list.name}</Text>
                    <Text className="text-secondary-700">{itemQuantity} items</Text>

                    {list.share && (
                        <View className="flex flex-row justify-start items-center">
                            <Ionicons name="people-sharp" size={20} color="#0CC25F"  style={{marginRight: 4}}/>
                            <Text className="m-0 p-0 text-secondary-700">Shared</Text>
                        </View>

                    )}

                    <Text className="text-secondary-700 text-sm">{list.created_at}</Text>
                </View>
            </Link>


            {/* ==========================Right Column============================ */}
            {/* flex-shrink-0 Prevents the <View> from shrinking.*/}
            <View className="flex-shrink-0" >
                {/*style={{display: "flex", backgroundColor: "red"}}*/}
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex items-center justify-center px-4"
                >
                    <Ionicons name="ellipsis-horizontal" size={28}/>
                </TouchableOpacity>

            </View>

            <TabMenuModal
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

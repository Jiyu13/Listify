import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {List, ListItem} from "@/types/type";
import CustomCheckBox from "@/components/CustomCheckBox";
import api from "@/api";
import CustomMenuModal from "@/components/CustomMenuModal";
import {Context} from "@/components/Context";



export default function  CustomItemCard(
    {item, setListItems}:{item: ListItem, setListItems: Dispatch<SetStateAction<ListItem[]>>}
) {

    const {userLists, setUserLists} = useContext(Context)
    const [isChecked, setIsChecked] = useState<boolean>(item?.checked ?? false)
    const [isModalVisible, setModalVisible] = useState(false)


    useEffect(() => {

        const updateListItemById = async () => {
            try {
                const response = await api.patch(
                    `/lists/${item?.list_id}/${item?.id}`,
                    {checked:isChecked }
                )
            }catch (error) {
                console.error("Error fetching item by item id:", error);
            }
        }
        updateListItemById()
    }, [isChecked, item?.id])

    const textDecoration = isChecked ? "line-through" : "no-underline"

    function handlePressCheck() {
        setIsChecked(!isChecked)
    }

    function handleOpenModal() {
        setModalVisible(!isModalVisible)
    }

    async function handleDeleteItem() {
        try {
            const response = await api.delete(`/lists/${item.list_id}/${item?.id}`)
            const updatedUserLists = userLists?.map((list: List) => {
                if (list.id === item.list_id) {
                    return {...list, item_count: list.item_count - 1}
                }
                return list
            })
            setListItems(response.data)
            setUserLists(updatedUserLists)

        } catch (error) {
            console.error("Error deleting item:", error);
        }
        setModalVisible(false)

    }

    return (
        <View className="flex flex-row justify-between items-center p-4 border-b-[1px] border-secondary-300">
            {/* ==========================Left Column============================ */}
            <View className="flex flex-1 flex-row">

                <CustomCheckBox
                    isChecked={isChecked}
                    handleCheck={handlePressCheck}
                    // children={}
                />
                <View className="flex flex-row ml-4 items-center justify-between">
                    <Text className={`flex text-xl mr-4 items-end ${textDecoration}`}>{item.units}</Text>
                    <Text className={`flex text-xl ${textDecoration}`}>{item.description}</Text>
                </View>

            </View>


            {/* ==========================Right Column============================ */}
            {/* flex-shrink-0 Prevents the <View> from shrinking.*/}
            <View className="flex-shrink-0 flex-row" >
                {/*style={{display: "flex", backgroundColor: "red"}}*/}
                {/*<TouchableOpacity*/}
                {/*    onPress={() => setModalVisible(true)}*/}
                {/*    className="flex items-center justify-center px-4"*/}
                {/*>*/}
                {/*    <Ionicons name="pencil-outline" size={24}/>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity
                    onPress={handleOpenModal}
                    className="flex items-center justify-center px-4"
                >
                    <Ionicons name="trash-outline" size={24}/>
                </TouchableOpacity>

            </View>

            <CustomMenuModal
                isVisible={isModalVisible}
                handleOpenModal={handleOpenModal}
                handleDeleteItem={handleDeleteItem}
                options={[ "Delete", "Cancel"]}
                modalHeight={118}
            />


        </View>
    )
}

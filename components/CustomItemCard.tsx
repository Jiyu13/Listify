import {Link} from "expo-router";
import {Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import MenuModal from "@/components/lists/MenuModal";
import React, {ReactNode, useEffect, useState} from "react";
import {ListItem} from "@/types/type";
import CustomCheckBox from "@/components/CustomCheckBox";
import api from "@/api";



export default function  CustomItemCard(
    {item}:{item: ListItem}
) {
    const [isChecked, setIsChecked] = useState<boolean>(item?.checked)

    const textDecoration = isChecked ? "line-through" : "no-underline"

    function handlePressCheck() {
        setIsChecked(!isChecked)
    }
    // console.log(textDecoration)


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
            <View className="flex-shrink-0" >
                {/*style={{display: "flex", backgroundColor: "red"}}*/}
                <TouchableOpacity
                    // onPress={() => setModalVisible(true)}
                    className="flex items-center justify-center px-4"
                >
                    <Ionicons name="ellipsis-horizontal" size={28}/>
                </TouchableOpacity>

            </View>

            {/*<MenuModal*/}
            {/*    isModalVisible={isModalVisible}*/}
            {/*    setModalVisible={setModalVisible}*/}
            {/*/>*/}


        </View>
    )
}

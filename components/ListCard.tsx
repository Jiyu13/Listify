import {List} from "@/types/type";
import {View, Text, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export default function ListCard({ list}: { list: List }) {


    function handleOnPress() {
        return
    }

    return (
        <View className="flex flex-row justify-between items-center p-4 border-b-[1px] border-secondary-300"
        >
            {/* ==========================Left Column============================ */}
            <View className="">

                <Text className="text-[18px]">{list.name}</Text>
                <Text className="text-secondary-700">{list.item_counts} items</Text>

                {list.share && (
                    <View className="flex flex-row justify-start items-center">
                        <Ionicons name="people-sharp" size={20} color="#0CC25F"  style={{marginRight: 4}}/>
                        <Text className="m-0 p-0 text-secondary-700">Shared</Text>
                    </View>

                )}

                <Text className="text-secondary-700 text-[12px]">{list.created_at}</Text>
            </View>

            {/* ==========================Right Column============================ */}
            <TouchableOpacity onPress={handleOnPress} className="flex items-center justify-center" style={{ flexShrink: 0}}>
                <Ionicons name="ellipsis-horizontal" size={24} onPress={handleOnPress}/>
            </TouchableOpacity>
            {/*<View className="flex items-center justify-center" style={{ flexShrink: 0}}>*/}
            {/*    <Ionicons name="ellipsis-horizontal" size={24} onPress={handleOnPress}/>*/}
            {/*</View>*/}

        </View>
    )
}

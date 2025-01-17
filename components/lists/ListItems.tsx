import {FlatList} from "react-native";
import ListCard from "@/components/lists/ListCard";
import React from "react";
import ItemCard from "@/components/lists/ItemCard";
import {ListItem} from "@/types/type";

export default function ListItems({listItems}: {listItems: ListItem[]}) {
    return (
        <>
            <FlatList
                data={listItems}
                renderItem={({item}) => <ItemCard item={item}/>}
                keyExtractor={(item) => item.id.toString()}   // FlatList requires keyExtractor to return a string
                showsVerticalScrollIndicator={false}
                className="rounded-2xl" //  mb-36
                contentContainerStyle={{ paddingBottom: 110 }}  // applies styles to the inner content of the FlatList, ensure the last item is fully visible above the tab bar
            />
        </>
    )
}

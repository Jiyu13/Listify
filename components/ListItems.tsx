import React from 'react';
import {FlatList} from "react-native";
import ListCard from "@/components/ListCard";

const listItems = [
    {
        "id": "1",
        "name": "Grocery List",
        "item_counts": 7,
        "created_at": "12 Jan 2025",
        "share": true,
    },
    {
        "id": "2",
        "name": "Packing List",
        "item_counts": 24,
        "created_at": "12 Jan 2025",
        "share": false,
    },
    {
        "id": "3",
        "name": "Gift Ideas",
        "item_counts": 10,
        "created_at": "12 Jan 2025",
        "share": false
    },
    {
        "id": "4",
        "name": "House Projects",
        "item_counts": 7,
        "created_at": "12 Jan 2025",
        "share": false
    },
    {
        "id": "5",
        "name": "Packing List",
        "item_counts": 24,
        "created_at": "12 Jan 2025",
        "share": false
    },
    {
        "id": "6",
        "name": "Gift Ideas",
        "item_counts": 10,
        "created_at": "12 Jan 2025",
        "share": false
    },
    {
        "id": "7",
        "name": "House Projects",
        "item_counts": 7,
        "created_at": "12 Jan 2025",
        "share": false
    }
]

export default function ListItems() {

    return (
        <FlatList
            data={listItems}
            renderItem={({item}) => <ListCard list={item}/>}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            className="rounded-2xl" //  mb-36
            contentContainerStyle={{ paddingBottom: 110 }}  // applies styles to the inner content of the FlatList, ensure the last item is fully visible above the tab bar
        />
    )
}


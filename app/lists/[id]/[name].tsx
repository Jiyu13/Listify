import {useLocalSearchParams, useNavigation, usePathname} from 'expo-router';
import {SafeAreaView} from "react-native-safe-area-context";
import {FlatList, Text, View} from "react-native";

import React, {useContext, useEffect, useState} from "react";
import api from "@/api";
import {ListItem} from "@/types/type";

import ListItems from "@/components/lists/ListItems";
import CustomHeader from "@/components/CustomHeader";
import {Context} from "@/components/Context";

export default function ItemsPage() {

    const {setListItems, appUser} = useContext(Context)
    const { id, name } = useLocalSearchParams()


     // provide a default value []


    // Custom Header Dynamically
    // const navigation = useNavigation();
    // useEffect(() => {
    //     // Update the header title dynamically
    //     navigation.setOptions({
    //         title: `${name}`,
    //         headerShown: true,
    //     });
    // }, [id, navigation]);

    useEffect(() => {
        const fetchListItemsByListId = async () => {
            try {
                const response = await api.get(`/lists/${id}`)
                setListItems(response.data)
            } catch (error) {
                console.error("Error fetching lists by user:", error);
            }

        }
        fetchListItemsByListId()
    }, [id])

    return (

        <CustomHeader
            headerText={name as string || "Default Header"}
            headerStyle="text-2xl font-Jakarta"
            searchText="item"
            children={<ListItems />}
        />

    )
}

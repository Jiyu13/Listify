import {useLocalSearchParams, useNavigation, usePathname} from 'expo-router';
import React, {useEffect, useState} from "react";
import api from "@/api";
import {ListItem} from "@/types/type";

import ListItems from "@/components/lists/ListItems";
import CustomPageTemplate from "@/components/custom_templates/CustomPageTemplate";
import ScreenHeader from "@/components/ScreenHeader";
import CustomAddItemForm from "@/components/custom_templates/CustomAddItemForm";

export default function ItemsPage() {

    const { id, name } = useLocalSearchParams()


    const [listItems, setListItems] = useState<ListItem[]>([]) // provide a default value []
    const [showAddItemForm, setShowAddItemForm] = useState(false)


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

    const navigation = useNavigation()
    function handleGoBack(){
        navigation.goBack()
    }
    function handleSearchItem() {
        return
    }

    console.log(name + " Page Loaded");


    return (

        <CustomPageTemplate
            headerType="Screen"
            headerText={name as string || "Default Header"}
            headerStyle="text-2xl font-Jakarta"
            searchText="item"
            listId={parseInt(id as string)}
            state={listItems}
            setter={setListItems}
            showAddForm={showAddItemForm}
            setShowAddForm={setShowAddItemForm}
            header={
                <ScreenHeader
                    headerText={name as string}
                    searchText="item"
                    setShowAddForm={setShowAddItemForm}
                    handleSearch={handleSearchItem}
                    handleGoBack={handleGoBack}
                />
            }
            children={<ListItems listItems={listItems} setListItems={setListItems}/>}
            form={
                <CustomAddItemForm
                    listId={parseInt(id as string)}
                    setItems={setListItems}
                    showAddForm={showAddItemForm}
                    setShowAddForm={setShowAddItemForm}
                />
            }
        />

    )
}

import {useLocalSearchParams, useNavigation} from 'expo-router';
import React, {useContext, useEffect, useState} from "react";
import api from "@/api";
import {ListItem} from "@/types/type";

import ListItems from "@/components/lists/ListItems";
import CustomPageTemplate from "@/components/custom_templates/CustomPageTemplate";
import ScreenHeader from "@/components/headers/ScreenHeader";
import ItemAddForm from "@/components/forms/ItemAddForm";
import {Context} from "@/components/Context";
import ModalTemplate from "@/components/modals/ModalTemplate";

export default function ItemsPage() {

    const { id, name } = useLocalSearchParams()
    const {setRefreshing} = useContext(Context)


    const [listItems, setListItems] = useState<ListItem[]>([]) // provide a default value []
    const [showAddItemForm, setShowAddItemForm] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    function handleSearchItemInput(text: string) {
        setSearchInput(text)
    }

    const fetchListItemsByListId = async () => {
        try {
            const response = await api.get(`/lists/${id}`)
            setListItems(response.data)
        } catch (error) {
            console.error("Error fetching lists by user:", error);
        } finally {
            setRefreshing(false);
        }

    }

    useEffect(() => {
        fetchListItemsByListId()
    }, [id])

    const navigation = useNavigation()
    function handleGoBack(){
        navigation.goBack()
    }

    function handleOnRefresh() {
        fetchListItemsByListId()
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
                    searchInput={searchInput}
                    handleSearch={handleSearchItemInput}
                    handleGoBack={handleGoBack}
                />
            }
            children={
                <ListItems
                    listItems={listItems}
                    setListItems={setListItems}
                    searchInput={searchInput}
                    handleOnRefresh={handleOnRefresh}
                />
            }
            form={
                <ModalTemplate
                    isModalVisible ={showAddItemForm}
                    setModalVisible = {setShowAddItemForm}
                    children = {
                        <ItemAddForm
                            listId={parseInt(id as string)}
                            setItems={setListItems}
                            setShowAddForm={setShowAddItemForm}
                        />
                    }
                />

            }
        />

    )
}

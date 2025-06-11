import React, {useContext, useState} from "react";
import Lists from "@/components/lists/Lists";
import {Context} from "@/components/Context";
import CustomPageTemplate from "@/components/custom_templates/CustomPageTemplate";
import TabHeader from "@/components/headers/TabHeader";
import TabAddForm from "@/components/forms/TabAddForm";
import ModalTemplate from "@/components/modals/ModalTemplate";


export default function HomePage() {
    const {userLists, setUserLists} = useContext(Context)

    const [showAddForm, setShowAddForm] = useState(false)
    const [searchInput, setSearchInput] = useState("")

    function handleSearchListInput(text: string) {
        setSearchInput(text)
    }

    console.log("Home Page Loaded");

    return (
        <CustomPageTemplate
            headerType="Tab"
            headerText="Lists"
            headerStyle="text-3xl font-JakartaBold"
            searchText="list"
            state={userLists}
            setter={setUserLists}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
            header={
                <TabHeader
                    headerText="Lists"
                    searchText="list"
                    setShowAddForm={setShowAddForm}
                    searchInput={searchInput}
                    handleSearch={handleSearchListInput}
                />
            }
            children={<Lists searchInput={searchInput}/>}
            form={
                <ModalTemplate
                    isModalVisible ={showAddForm}
                    setModalVisible = {setShowAddForm}
                    children = {
                        <TabAddForm
                            showAddForm={showAddForm}
                            setShowAddForm={setShowAddForm}
                        />
                    }
                />
            }
        />
    )
}

import React, {useContext, useEffect, useState} from "react";
import Lists from "@/components/lists/Lists";
import {Context} from "@/components/Context";
import CustomPageTemplate from "@/components/custom_templates/CustomPageTemplate";
import TabHeader from "@/components/headers/TabHeader";
import TabAddForm from "@/components/forms/TabAddForm";


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
                <TabAddForm
                    showAddForm={showAddForm}
                    setShowAddForm={setShowAddForm}

                />
            }
        />
        // <SafeAreaView className="flex h-full">
        //     <View className="p-5">
        //         <View className="mb-4">
        //             <View className="flex flex-row items-center justify-between h-20 ">
        //                 <Text className="text-3xl font-JakartaBold">Lists</Text>
        //                 <TouchableOpacity onPress={() => setShowAddForm(true)}>
        //                     <Ionicons name="add" size={32} color="#3e4e50" />
        //                 </TouchableOpacity>
        //             </View>
        //
        //             {/* ======================== SEARCH BAR ===========================*/}
        //             <View className="flex flex-row justify-start items-center h-14 bg-secondary-300 rounded-2xl">
        //                 <Ionicons name="search" size={24} color="gray" className="mx-2.5"/>
        //                 <TextInput
        //                     placeholder="Search Lists"
        //                     value=""
        //                     onChangeText={() => handleSearchList}
        //                     className="flex-1 text-tiny"
        //                 />
        //             </View>
        //         </View>
        //
        //
        //         <Lists />
        //
        //
        //         {/* ====================== ADD A LIST FORM=========================*/}
        //         <ReactNativeModal
        //             isVisible={showAddForm}
        //             backdropOpacity={0.3}
        //             backdropTransitionOutTiming={0} // Instantly remove the backdrop
        //             animationIn="slideInUp" // Controls how the modal appears
        //             animationOut="slideOutDown" // Controls how the modal disappears
        //             animationOutTiming={300} // Adjusts the duration of the closing animation
        //             onBackdropPress={() => setShowAddForm(false)}  // close modal if clicking outside <View>
        //             onBackButtonPress={() => setShowAddForm(false)} // for Android, handles back button press
        //
        //         >
        //             <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
        //                 <Text className="text-2xl text-primary-900 font-JakartaBold mb-2 text-center">New List</Text>
        //                 <InputField
        //                     label="List Name"
        //                     // icon={icons.lock}
        //                     placeholder="grocery list"
        //                     value={newListData.name}
        //                     onChangeText={(text) => handleInput("name", text)}
        //                 />
        //                 <CustomButton
        //                     title="Create"
        //                     onPress={handleAddList}
        //                     className="mt-5 bg-success-500"
        //                 />
        //             </View>
        //         </ReactNativeModal>
        //
        //
        //     </View>
        // </SafeAreaView>
    )
}

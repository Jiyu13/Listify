import {View} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {CustomPageProps} from "@/types/type";

export default function CustomPageTemplate(
    {header, children, form}: CustomPageProps)
{

    return (
        <SafeAreaView className="flex h-full">
        <View className="p-5">
            {/*<View className="mb-4">*/}
            {/*    <View className="flex flex-row items-center justify-between h-20 ">*/}

            {/*        {*/}
            {/*            headerType === "Screen" && (*/}
            {/*            <TouchableOpacity onPress={handleGoBack}>*/}
            {/*                <Ionicons name="chevron-back" size={32} color="#3e4e50" />*/}
            {/*            </TouchableOpacity>*/}
            {/*            )*/}
            {/*        }*/}


            {/*        <Text className={headerStyle}>{headerText}</Text>*/}

            {/*        <TouchableOpacity onPress={() => setIsAddModalOpen(true)}>*/}
            {/*            <Ionicons name="add" size={32} color="#3e4e50" />*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}

            {/*    /!* ======================== SEARCH BAR ===========================*!/*/}
            {/*    <View className="flex flex-row justify-start items-center h-14 bg-secondary-300 rounded-2xl">*/}
            {/*        <Ionicons name="search" size={24} color="gray" className="mx-2.5"/>*/}
            {/*        <TextInput*/}
            {/*            placeholder={`Search ${searchText}`}*/}
            {/*            value=""*/}
            {/*            onChangeText={(text) => handleSearchItem(text)}*/}
            {/*            className="flex-1 text-tiny"*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*</View>*/}
            {/*{children}*/}
            {/*<CustomAddItemForm*/}
            {/*    setShowAddForm={setShowAddForm}*/}
            {/*    showAddForm={showAddForm}*/}
            {/*    listId={listId as number}*/}
            {/*    listItems={state}*/}
            {/*    setListItems={setter as Dispatch<SetStateAction<any[]>>}*/}
            {/*/>*/}

            {header}

            {children}

            {form}



        </View>
        </SafeAreaView>

    )
}

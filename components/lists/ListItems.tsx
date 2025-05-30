import {FlatList, RefreshControl} from "react-native";
import React, {Dispatch, SetStateAction, useContext} from "react";
import ItemCard from "@/components/lists/ItemCard";
import {List, ListItem} from "@/types/type";
import {useAuth} from "@clerk/clerk-expo";
import {Context} from "@/components/Context";

export default function ListItems({
      listItems, setListItems, searchInput, handleOnRefresh
    }: {
        listItems: ListItem[],
        setListItems: Dispatch<SetStateAction<ListItem[]>>,
        searchInput: string
        handleOnRefresh: () => void
    }) {

    const { isSignedIn } = useAuth()
    const {refreshing} = useContext(Context)


    const results = isSignedIn && searchInput === "" ?
        listItems
        :
        listItems?.filter((li: ListItem) => {
                return li.description.toLowerCase().includes(searchInput.toLowerCase())
            }
        )


    return (
        <>
            <FlatList
                data={results}
                renderItem={({item}) => <ItemCard item={item} setListItems={setListItems}/>}
                keyExtractor={(item) => item?.id+item?.description}   // FlatList requires keyExtractor to return a string
                showsVerticalScrollIndicator={false}
                className="rounded-2xl" //  mb-36
                contentContainerStyle={{ paddingBottom: 110 }}  // applies styles to the inner content of the FlatList, ensure the last item is fully visible above the tab bar
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
                }
            />
        </>
    )
}

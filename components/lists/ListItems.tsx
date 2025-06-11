import {FlatList, RefreshControl, Text, View} from "react-native";
import React, {Dispatch, SetStateAction, useContext} from "react";
import ItemCard from "@/components/lists/ItemCard";
import {ListItem} from "@/types/type";
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
        <View  style={{ height: "100%", flex: 1}}>
            {
                listItems.length === 0 ? (
                    <View >
                        <Text className='text-customText-logo font-Jakarta text-lg'>
                            You don't have anything in this list. Add one!
                        </Text>
                    </View>
                )
                :
                (
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
                )
            }

        </View>
    )
}

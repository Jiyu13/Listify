import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {FlatList, View, Text, RefreshControl} from "react-native";
import ListCard from "@/components/lists/ListCard";
import {Context} from "@/components/Context";
import {useAuth} from "@clerk/clerk-expo";
import api from "@/api";
import {List} from "@/types/type";

export default function Lists(
    {searchInput} : { searchInput: string }
) {

    const { isSignedIn } = useAuth()
    const {setAppUser, appUser, userLists, setUserLists, refreshing, setRefreshing} = useContext(Context)

    const [loadingLists, setLoadingLists] = useState(true)

    // const [userlists, setUserLists] = useState(null)
    const results = isSignedIn && searchInput === "" ?
        userLists
        :
        userLists?.filter((ul: List) => {
            return ul.name.toLowerCase().includes(searchInput.toLowerCase())
        }
    )

    const fetchListsByUserId = async () => {
        if (isSignedIn && appUser) {
            try {
                const user_id = appUser?.id
                const response = await api.get(`/ul/${user_id}`)
                setUserLists(response.data)
                setLoadingLists(false)
            } catch (error) {
                console.error("Error fetching lists by user:", error);
            } finally {
                setLoadingLists(false); // Stop loading after fetching
                setRefreshing(false);
            }
        }
    }

    useEffect(() => {
        fetchListsByUserId()
    }, [isSignedIn, appUser])


    function handleOnRefresh() {
        fetchListsByUserId(); // Fetch latest data on refresh
        // setTimeout(() => setRefreshing(false), 1000); // Simulate fetch
    }

    return (
        <>
            {
                loadingLists ? (
                    <View className='items-center justify-center' style={{ height: "80%"}}>
                        <Text className='text-customText-logo font-Jakarta text-lg'>
                            Loading your lists...
                        </Text>
                    </View>
                ) : userLists.length > 0 ?
                    <FlatList
                        data={results}
                        renderItem={({item}) => <ListCard list={item}/>}
                        keyExtractor={(item) => item.id+item.name}
                        showsVerticalScrollIndicator={false}
                        className="rounded-2xl" //  mb-36
                        contentContainerStyle={{ paddingBottom: 110 }}  // applies styles to the inner content of the FlatList, ensure the last item is fully visible above the tab bar

                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
                        }
                    />
                    :
                    <View className='items-center justify-center' style={{ height: "80%"}}>
                        <Text className='text-customText-logo font-Jakarta text-lg'>
                            You don't have any list. Add one!
                        </Text>
                    </View>
            }
        </>

    )
}


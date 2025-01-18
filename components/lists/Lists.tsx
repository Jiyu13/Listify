import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react';
import {FlatList} from "react-native";
import ListCard from "@/components/lists/ListCard";
import {Context} from "@/components/Context";
import {useAuth} from "@clerk/clerk-expo";
import api from "@/api";
import {List} from "@/types/type";

export default function Lists(
//     {userLists, setUserLists} : {
//     userLists: List[], setUserLists: Dispatch<SetStateAction<List[]>>
// }
) {

    const { isSignedIn } = useAuth()
    const {setAppUser, appUser, userLists, setUserLists} = useContext(Context)

    // const [userlists, setUserLists] = useState(null)


    useEffect(() => {
        const fetchListsByUserId = async () => {
            if (isSignedIn && appUser) {
                try {
                    const user_id = appUser?.id
                    const response = await api.get(`/ul/${user_id}`)
                    setUserLists(response.data)
                } catch (error) {
                    console.error("Error fetching lists by user:", error);
                }
            }
        }
        fetchListsByUserId()
    }, [isSignedIn, appUser])


    return (
        <>
            {userLists && (
                <FlatList
                    data={userLists}
                    renderItem={({item}) => <ListCard list={item}/>}
                    keyExtractor={(item) => item.id+item.name}
                    showsVerticalScrollIndicator={false}
                    className="rounded-2xl" //  mb-36
                    contentContainerStyle={{ paddingBottom: 110 }}  // applies styles to the inner content of the FlatList, ensure the last item is fully visible above the tab bar
                />
            )}
        </>

    )
}


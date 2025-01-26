import {List, ListItem} from "@/types/type";
import {View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React, {Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import TabBottomModal from "@/components/modals/TabBottomModal";
import api from "@/api";
import {useAuth} from "@clerk/clerk-expo";
import {Context} from "@/components/Context";
import {Link, useRouter} from "expo-router";
import TabEditForm from "@/components/forms/TabEditForm";
import {ellipsis} from "@/constants";
import ShareModal from "@/components/modals/ShareModal";
import InviteByUsernameForm from "@/components/forms/InviteByUsernameForm";

export default function ListCard({
    list
}: {
    list: List,
}) {
    const router = useRouter();
    const { isSignedIn } = useAuth()

    const {setAppUser, appUser, userLists, setUserLists} = useContext(Context)

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [showEditForm, setShowEditForm] = useState<boolean>(false)
    const [editListFormData, seEditListFormData] = useState(list)

    const [isShareModalVisible, setShareModalVisible] = useState<boolean>(false);   // after clicking share option
    const [sharedWith, setShareWith] = useState("")                                 // with username / email
    const [showShareForm, setShowShareForm] = useState<boolean>(false)



    async function handleEditList() {
        setModalVisible(false)
        setShowEditForm(true)
    }

    function handleEditFormInput(name: string, value: string) {
        seEditListFormData({...editListFormData, [name]: value})
    }

    async function handleEditFormSubmit(editType: string) {
        setShowEditForm(false)

        const updateField = editType === "name" ? {name: editListFormData.name} : {share: editListFormData.share}
        try {
            const response = await api.patch(`/lists/${list?.id}`, updateField)
            const updatedData = response.data

            const updatedLists = userLists?.map((l: List) => {
                console.log(typeof l.id, typeof list.id);
                if (l.id === list?.id) {
                    return {...l, ...updatedData}
                }
                return l
            })

            setUserLists(updatedLists)

        } catch(error) {
            console.error("Error adding item by list id:", error);
        }
        seEditListFormData(list)
    }

    async function handleDeleteList() {
        if (appUser) {
            try {
                const list_id = list?.id
                const response = await api.delete(`/ul/${appUser.id}/${list_id}`)
                const updatedUserLists = userLists?.filter((ul:List) => {
                    return ul.id !== list_id
                })
                setUserLists(updatedUserLists)
            } catch (error) {
                console.error("Error fetching list items:", error);
            }
        }

        setModalVisible(false)

    }


    // =========================== share feature =======================================
    function handleShareList() {
        // to show the share by code, username, email form
        setModalVisible(false)
        setShareModalVisible(true)
    }


    function handleShareByClick(text: string) {
        setShareWith(text)
        setShowShareForm(true)
        setShareModalVisible(false)
    }




    return (
        <View className="flex flex-row items-center p-4 border-b-[1px] border-secondary-300">
            {/* ==========================Left Column============================ */}
            <Link
                href={{
                    pathname: `/lists/[id]/[name]`,
                    params: { id: list?.id as number, name: list?.name },
                }}
                  className="flex-1"
            >
                <View>
                    <Text className="text-lg">{list.name}</Text>
                    <Text className="text-secondary-700">{list?.item_count} items</Text>

                    {list.share && (
                        <View className="flex flex-row justify-start items-center">
                            <Ionicons name="people-sharp" size={20} color="#0CC25F"  style={{marginRight: 4}}/>
                            <Text className="m-0 p-0 text-secondary-700">Shared</Text>
                        </View>

                    )}

                    <Text className="text-secondary-700 text-sm">{list.created_at}</Text>
                </View>
            </Link>


            {/* ==========================Right Column============================ */}
            {/* flex-shrink-0 Prevents the <View> from shrinking.*/}
            <View className="flex-shrink-0" >
                {/*style={{display: "flex", backgroundColor: "red"}}*/}
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="flex items-center justify-center px-4"
                >
                    <Ionicons name={ellipsis} size={28}/>
                </TouchableOpacity>

            </View>

            <TabBottomModal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
                handleEditList={handleEditList}
                handleDeleteList={handleDeleteList}
                handleShareList={handleShareList}
            />

            <ShareModal
                isShareModalVisible={isShareModalVisible}
                setShareModalVisible={setShareModalVisible}
                // handleShareEmail={handleShareEmail}
                sharedCode={list?.shared_code}
                // setShareWith={setShareWith}
                handleShareByClick={handleShareByClick}
            />

            <TabEditForm
                editType="name"
                isFormModalOpen={showEditForm}
                setIsFormModalOpen={setShowEditForm}
                formData={editListFormData}
                setFormData={seEditListFormData}
                handleInput={handleEditFormInput}
                handleButtonPress={handleEditFormSubmit}
                buttonText="Submit"

            />

            <InviteByUsernameForm
                listId={list?.id as number}
                inviteType={sharedWith}
                isFormModalOpen={showShareForm}
                setIsFormModalOpen={setShowShareForm}
                // formData={shareFormData}
                // setFormData={setShareFormData}
                // handleInput={handleShareFormInput}
                // handleButtonPress={handleShareFormSubmit}
                buttonText="Add collaborator"
            />

        </View>
    )
}

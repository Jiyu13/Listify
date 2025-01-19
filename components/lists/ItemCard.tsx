import {ListItem} from "@/types/type";
import CustomItemCard from "@/components/custom_templates/CustomItemCard";
import {Dispatch, SetStateAction} from "react";

export default function ItemCard({ item, setListItems }: { item: ListItem, setListItems: Dispatch<SetStateAction<ListItem[]>>}) {
    return (
        <CustomItemCard
            item={item}
            setListItems={setListItems}
        />

    )
}

import {ListItem} from "@/types/type";
import CustomItemCard from "@/components/CustomItemCard";

export default function ItemCard({ item }: { item: ListItem}) {
    return (
        <CustomItemCard
            item={item}
        />

    )
}

import { useParams } from "react-router-dom";

import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";


const RestaurantMenu = () => {

    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(null);

    if (resInfo === null) {
        return <Shimmer />
    }

    const { name, totalRatingsString, costForTwoMessage, id, cuisines } = resInfo?.cards.find(c => c.card?.card?.info)?.card?.card?.info || {};

    const categories = resInfo?.cards.find(c => c.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
            c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || [];

    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-lg md:text-2xl lg:text-2xl">{name}</h1>
            <h4 className="font-bold text-md md:text-xl lg:text-xl">{cuisines?.join(", ") || ""} - {costForTwoMessage}</h4>
            {categories?.map((category, index) =>
                //controlled component
                <RestaurantCategory
                    key={category?.card?.card?.title}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    //setShowIndex={()=> setShowIndex(index)}
                    setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
                    count
                />
            )}
        </div>
    )
}

export default RestaurantMenu;
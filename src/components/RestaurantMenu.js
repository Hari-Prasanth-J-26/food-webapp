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
        <div className="w-full bg-gray-50 min-h-screen py-8">
            <div className="max-w-[800px] mx-auto px-4 sm:px-8">
                <div className="text-center mb-10 pb-8 border-b border-gray-200">
                    <h1 className="font-extrabold text-3xl md:text-4xl text-gray-800 mb-2">{name}</h1>
                    <p className="text-gray-500 font-medium text-lg italic">
                        {cuisines?.join(", ") || ""} • {costForTwoMessage}
                    </p>
                    <div className="mt-4 flex justify-center items-center gap-4">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                            {totalRatingsString}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {categories?.map((category, index) =>
                        //controlled component
                        <RestaurantCategory
                            key={category?.card?.card?.title}
                            data={category?.card?.card}
                            showItems={index === showIndex ? true : false}
                            setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenu;
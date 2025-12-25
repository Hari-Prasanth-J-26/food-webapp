import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {

    const symbolDown = "⌄";
    const symbolUp = "^";

    const handleClick = () => {
        setShowIndex();
    }

    return (
        <div>
            <div className="mx-auto w-11/12 md:w-10/12 lg:w-7/12 my-4 bg-gray-100 p-4 shadow-lg">
                <div className="flex justify-between cursor-pointer"
                    onClick={handleClick}
                >
                    <span className="font-bold text-md md:text-xl lg:text-xl">
                        {data.title} ({data.itemCards?.length || 0})
                    </span>
                    <span className="text-2xl">{showItems ? symbolUp : symbolDown}</span>
                </div>
                {showItems && <ItemList items={data.itemCards || []} />}
            </div>
        </div>
    )
}

export default RestaurantCategory;
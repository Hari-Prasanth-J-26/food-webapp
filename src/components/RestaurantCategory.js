import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {

    const symbolDown = "⌄";
    const symbolUp = "^";

    const handleClick = () => {
        setShowIndex();
    }

    return (
        <div className="mb-4">
            <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center cursor-pointer select-none"
                    onClick={handleClick}
                >
                    <span className="font-extrabold text-gray-800 text-lg">
                        {data.title} <span className="text-gray-400 ml-2 font-medium">({data.itemCards?.length || 0})</span>
                    </span>
                    <span className={`text-2xl text-gray-400 transition-transform duration-300 ${showItems ? 'rotate-180' : ''}`}>
                        {symbolDown}
                    </span>
                </div>
                {showItems && (
                    <div className="mt-4 pt-4 border-t border-gray-50">
                        <ItemList items={data.itemCards || []} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default RestaurantCategory;
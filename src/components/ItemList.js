import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    }

    return (
        <div className="divide-y divide-gray-100">
            {items.map((item) => (
                <div data-testid="foodItems" key={item.card.info.id} className="py-6 flex flex-col-reverse sm:flex-row justify-between gap-6 group">
                    <div className="flex-1 text-left">
                        <div className="mb-1">
                            {item.card.info.itemAttribute?.vegClassifier === "VEG" ?
                                <span className="text-xs text-amber-600 border border-amber-600 px-1 rounded font-bold uppercase tracking-tighter">Veg</span> :
                                <span className="text-xs text-rose-600 border border-red-600 px-1 rounded font-bold uppercase tracking-tighter">Non-Veg</span>
                            }
                        </div>
                        <h3 className="text-lg font-extrabold text-gray-800">{item.card.info.name}</h3>
                        <p className="text-gray-700 font-bold text-sm mb-3">
                            ₹ {item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                            {item.card.info.description}
                        </p>
                    </div>

                    <div className="relative flex-shrink-0 w-full sm:w-40 h-40 sm:h-32 mb-4 sm:mb-0">
                        {item.card.info.imageId && (
                            <img
                                src={CDN_URL + item.card.info.imageId}
                                className="w-full h-full object-cover rounded-2xl shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-500"
                                alt={item.card.info.name}
                            />
                        )}
                        <button
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white text-orange-600 font-extrabold px-8 py-2 rounded-xl shadow-lg border border-gray-100 hover:bg-gray-50 hover:shadow-xl active:scale-95 transition-all text-sm whitespace-nowrap"
                            onClick={() => handleAddItem(item)}
                        >
                            ADD
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ItemList;
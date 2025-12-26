import { CDN_URL } from "../utils/constants";

const RestaurantCart = (props) => {
    const { cloudinaryImageId, name, costForTwo, avgRating, sla, cuisines = [] } = props;
    //const deliveryTime = sla?.deliveryTime;

    /*
        const { resData } = props;
      
        const {
            cloudinaryImageId,
            name,
            avgRating,
            cuisines,
            costForTwo,
            deliveryTime,
        } = resData;
         */

    return (
        <div
            data-testid="resCard"
            className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
            <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    alt={name}
                    src={CDN_URL + cloudinaryImageId}
                    onError={(e) => {
                        e.target.src = "https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg";
                    }}
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-800 shadow-sm">
                    {sla?.deliveryTime} mins
                </div>
            </div>

            <div className="flex flex-col flex-grow p-4">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-lg line-clamp-1 flex-1">{name}</h3>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${avgRating >= 4 ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-orange-700'}`}>
                        {avgRating} ⭐️
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-2 line-clamp-1">
                    {cuisines?.join(", ")}
                </p>

                <div className="flex justify-between items-center text-sm font-medium text-gray-700 mt-2">
                    <span>{costForTwo}</span>
                </div>

                {/* Footer Button - Pushed to bottom */}
                <div className="mt-auto pt-4">
                    <button className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-100 uppercase tracking-wide text-sm sm:text-base">
                        Order Now
                    </button>
                </div>
            </div>
        </div>

    )
};


export default RestaurantCart;
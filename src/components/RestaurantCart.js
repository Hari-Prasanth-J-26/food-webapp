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
            className="w-full m-4 p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-90"
        >
            <img
                className="rounded-lg w-full h-40 object-cover"
                alt="res-logo"
                src={CDN_URL + cloudinaryImageId}
            />
            <h3 className="font-bold py-2 text-lg">{name}</h3>
            <h4>{cuisines?.join(", ")}</h4>
            <h4>{avgRating} ⭐️</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.deliveryTime} mins 🛵</h4>

            {/* Footer Button */}
            <div className="mt-4">
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
                    Order Now
                </button>
            </div>
        </div>

    )
};


export default RestaurantCart;
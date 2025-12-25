import RestaurantCart from "./RestaurantCart";
import restaurantList from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurantCart from "../utils/useRestaurantCart";
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom";

const Body = () => {

    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(()=>{fetchData()}, []); 

    const fetchData = async () => {
        const data = await fetch(
      //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9698196&lng=77.7499721&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

        
    const json = await data.json();
        //console.log(json);
        //setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
/*
    const resCart = useRestaurantCart();
    console.log("At body" + resCart);
    setListOfRestaurants(resCart);
    setFilteredRestaurants(resCart);
*/
    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) {
        return <h1>Looks like you're offline. Please check your internet connection...</h1>
    }

    const {loggedInUser, setUserName} = useContext(UserContext);

    //Conditional rendering
    return listOfRestaurants?.length === 0 ? <Shimmer /> : 
    (
        <div className="p-4 space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {/* Search Input */}
            <input
            type="text"
            data-testid="searchInput"
            className="border rounded-lg p-2 w-full sm:w-auto"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                const filteredRestaurant = listOfRestaurants.filter((res) =>
                    res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredRestaurants(filteredRestaurant);
                }
            }}
            />

            {/* Search Button */}
            <button
            data-testid="resCard"
            className="px-4 py-2 bg-yellow-200 rounded-lg w-full sm:w-auto"
            onClick={() => {
                const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredRestaurants(filteredRestaurant);
            }}
            >
            Search
            </button>

            {/* Top Rated */}
            <button
            data-testid="resFilterCard"
            className="px-4 py-2 bg-blue-200 rounded-lg w-full sm:w-auto"
            onClick={() => {
                const filteredList = listOfRestaurants.filter(
                (res) => res?.info?.avgRating > 4.2
                );
                setFilteredRestaurants(filteredList);
            }}
            >
            Top Rated Restaurants
            </button>

            {/* Username */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
            <label>User name:</label>
            <input
                className="border rounded-lg border-black p-2 flex-1"
                value={loggedInUser}
                onChange={(e) => setUserName(e.target.value)}
            />
            </div>
        </div>

        {/* Restaurant Grid */}
        <div className="px-4 py-6 grid grid-cols-1 max-[500px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRestaurants?.map((restaurant) => (
            <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
            >
            <RestaurantCart {...restaurant?.info} />
            </Link>
        ))}
        </div>

    </div>

    )
};

export default Body;
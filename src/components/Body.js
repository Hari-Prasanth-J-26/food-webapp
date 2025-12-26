import { RES_CART_URL } from "../utils/constants";
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

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const proxies = [
            "https://api.allorigins.win/get?url=",
            "https://api.codetabs.com/v1/proxy?quest=",
            "https://corsproxy.io/?",
            "https://thingproxy.freeboard.io/fetch/"
        ];

        for (const proxy of proxies) {
            try {
                console.log(`Trying proxy: ${proxy}`);
                const targetUrl = RES_CART_URL;
                const proxyUrl = proxy + encodeURIComponent(targetUrl);

                const response = await fetch(proxyUrl);
                if (!response.ok) throw new Error("Proxy failed");

                let json;
                if (proxy.includes("allorigins")) {
                    const wrapper = await response.json();
                    json = JSON.parse(wrapper.contents);
                } else {
                    json = await response.json();
                }

                if (json?.data) {
                    const restaurantCard = json.data.cards.find(card =>
                        card?.card?.card?.gridElements?.infoWithStyle?.restaurants
                    );
                    const restaurants = restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

                    setListOfRestaurants(restaurants);
                    setFilteredRestaurants(restaurants);
                    console.log("Successfully fetched from proxy:", proxy);
                    return; // Exit if successful
                }
            } catch (error) {
                console.error(`Failed with proxy ${proxy}:`, error);
            }
        }

        // If all proxies fail, set to empty to stop shimmer
        setListOfRestaurants([]);
    }
    /*
        const resCart = useRestaurantCart();
        console.log("At body" + resCart);
        setListOfRestaurants(resCart);
        setFilteredRestaurants(resCart);
    */
    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) {
        return <h1>Looks like you're offline. Please check your internet connection...</h1>
    }

    const { loggedInUser, setUserName } = useContext(UserContext);

    //Conditional rendering
    return listOfRestaurants?.length === 0 ? <Shimmer /> :
        (
            <div className="w-full">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 space-y-8 py-8">
                    {/* Search & Filters */}
                    <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                        {/* Search Group */}
                        <div className="flex w-full md:w-auto items-center gap-2">
                            <input
                                type="text"
                                data-testid="searchInput"
                                placeholder="Search for restaurants..."
                                className="flex-1 md:w-80 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                            <button
                                data-testid="resCard"
                                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-100"
                                onClick={() => {
                                    const filteredRestaurant = listOfRestaurants.filter((res) =>
                                        res.info.name.toLowerCase().includes(searchText.toLowerCase())
                                    );
                                    setFilteredRestaurants(filteredRestaurant);
                                }}
                            >
                                Search
                            </button>
                        </div>

                        {/* Filters Group */}
                        <div className="flex flex-wrap w-full md:w-auto items-center gap-4">
                            <button
                                data-testid="resFilterCard"
                                className="px-5 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 active:scale-95 transition-all shadow-md shadow-amber-100 flex items-center gap-2"
                                onClick={() => {
                                    const filteredList = listOfRestaurants.filter(
                                        (res) => res?.info?.avgRating > 4.2
                                    );
                                    setFilteredRestaurants(filteredList);
                                }}
                            >
                                <span>⭐ Top Rated</span>
                            </button>

                            <div className="flex items-center gap-3 bg-white border border-gray-200 p-1.5 px-4 rounded-xl shadow-sm">
                                <label className="text-sm font-medium text-gray-500 whitespace-nowrap">User:</label>
                                <input
                                    className="outline-none text-gray-800 font-semibold w-24 sm:w-32"
                                    value={loggedInUser}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Restaurant Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
                        {filteredRestaurants?.map((restaurant) => (
                            <Link
                                key={restaurant?.info?.id}
                                to={"/restaurants/" + restaurant?.info?.id}
                                className="flex flex-col no-underline transition-all duration-300 hover:z-10"
                            >
                                <RestaurantCart {...restaurant?.info} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        )
};

export default Body;
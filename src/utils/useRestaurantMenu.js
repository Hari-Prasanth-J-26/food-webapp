import { useEffect, useState } from "react"
import { MENU_API_URL1, MENU_API_URL2 } from "../utils/constants";

const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await fetch(MENU_API_URL1 + resId + MENU_API_URL2);
            const json = await data.json();
            setResInfo(json.data);
        } catch (err) {
            console.error("Error fetching menu:", err);
        }
    }
    return resInfo;
}

export default useRestaurantMenu;
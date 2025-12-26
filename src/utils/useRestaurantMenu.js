import { useEffect, useState } from "react"
import { MENU_API_URL1, MENU_API_URL2 } from "../utils/constants";

const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const proxies = [
            "https://api.allorigins.win/get?url=",
            "https://api.codetabs.com/v1/proxy?quest=",
            "https://corsproxy.io/?",
            "https://thingproxy.freeboard.io/fetch/"
        ];

        const targetUrl = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9698196&lng=77.7499721&restaurantId=" + resId + "&catalog_qa=undefined&submitAction=ENTER";

        for (const proxy of proxies) {
            try {
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
                    setResInfo(json.data);
                    return; // Exit if successful
                }
            } catch (error) {
                console.error(`Failed to fetch menu with proxy ${proxy}:`, error);
            }
        }
    }
    return resInfo;
}

export default useRestaurantMenu;
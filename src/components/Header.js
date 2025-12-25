import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import { Menu, X, ShoppingCart } from "lucide-react";

const Header = () => {

    const [btnName, setBtnName] = useState("Login");
    const [menuOpen, setMenuOpen] = useState(false);

    const onlineStatus = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext);

    const cartItems = useSelector((store)=>store.cart.items);

    return(
        <header className="bg-orange-500">
            <div className="flex justify-between items-center px-3 py-3 w-full">
                <div className="flex">
                    <img className="w-20 md:w-26 lg:w-28 rounded-3xl" src={LOGO_URL} alt="logo"/>
                </div>
                {/* Hamburger Menu - Mobile */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={34} />}
                    </button>
                </div>

                {/* Nav Menu */}
                <nav
                    className={`${
                        menuOpen ? "block" : "hidden"
                    } absolute top-25 md:top-30 lg:block lg:static lg:w-auto left-0 md:whitespace-nowrap bg-orange-500/80 w-full`}> 

                    <ul className="flex flex-col md:flex-row md:justify-between items-center md:px-4 md:py-4 text-white sm:text-base md:text-lg lg:text-lg">
                        <li className="sm:py-2 lg:px-4">
                            OnlineStatus {onlineStatus ? "🟢" : "🔴" }
                        </li>
                        <li className="sm:py-2 lg:px-4">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="sm:py-2 lg:px-4">
                            <Link to="/about">About Us</Link>
                        </li>
                        <li className="sm:py-2 lg:px-4">
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className="sm:py-2 lg:px-4">
                            <Link to="/grocery">Grocery</Link>
                        </li>
                        <li className="sm:py-2 lg:px-4 flex items-center">
                            <Link to="/cart" className="flex items-center gap-1">
                                <ShoppingCart size={22} className="text-white" />
                                <span>({cartItems.length})</span>
                            </Link>
                        </li>
                        <button className="login-btn py-1" onClick={ ()=> {
                            setBtnName(btnName === "Login" ? "Logout" : "Login");
                            }}>{btnName}
                        </button>
                        <li className="sm:py-2 lg:px-4">{loggedInUser}</li>
                    </ul>
                </nav>
            </div>  
        </header>
    ); 
};

export default Header;
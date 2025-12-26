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

    const { loggedInUser } = useContext(UserContext);

    const cartItems = useSelector((store) => store.cart.items);

    return (
        <header className="bg-orange-500 shadow-md sticky top-0 z-50">
            <div className="w-full px-4 sm:px-6 md:px-10 flex justify-between items-center py-4">
                <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300">
                    <img className="w-16 md:w-20 lg:w-24 rounded-2xl shadow-sm" src={LOGO_URL} alt="logo" />
                </Link>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white p-2 hover:bg-orange-600 rounded-lg transition-colors"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={32} />}
                    </button>
                </div>

                {/* Desktop Nav & Mobile Reveal */}
                <nav
                    className={`${menuOpen ? "flex" : "hidden"
                        } absolute top-full left-0 w-full bg-orange-500 border-t border-orange-400 p-6 lg:static lg:flex lg:w-auto lg:p-0 lg:border-none flex-col lg:flex-row items-center gap-6 shadow-xl lg:shadow-none transition-all duration-300`}
                >
                    <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 text-white font-semibold list-none">
                        <li className="flex items-center gap-2 bg-orange-600/50 px-3 py-1.5 rounded-full text-sm">
                            <span className="text-white/80">Status:</span>
                            <span>{onlineStatus ? "🟢 Online" : "🔴 Offline"}</span>
                        </li>
                        <li className="hover:text-orange-100 transition-colors">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="hover:text-orange-100 transition-colors">
                            <Link to="/about">About Us</Link>
                        </li>
                        <li className="hover:text-orange-100 transition-colors">
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className="hover:text-orange-100 transition-colors">
                            <Link to="/grocery">Grocery</Link>
                        </li>
                        <li className="flex items-center">
                            <Link to="/cart" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all">
                                <ShoppingCart size={20} />
                                <span className="pt-0.5">({cartItems.length})</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="flex flex-col lg:flex-row items-center gap-6 mt-4 lg:mt-0 lg:ml-8 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-orange-400 lg:pl-8">
                        <button
                            className="bg-green-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 active:scale-95 transition-all shadow-md w-full lg:w-auto"
                            onClick={() => {
                                setBtnName(btnName === "Login" ? "Logout" : "Login");
                            }}
                        >
                            {btnName}
                        </button>
                        <span className="text-white/90 text-sm italic hidden sm:inline">{loggedInUser}</span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
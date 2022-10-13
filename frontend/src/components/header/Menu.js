import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import Popover from "../popover/Popover";
import { useState } from "react";

const Menu = () => {
    const navLinks = [
        { label: "Home", icon: "home", path: "/" },
        { label: "Message", icon: "near_me", path: "/message" },
        { label: "Discover", icon: "explore", path: "/discover" },
        { label: "Notify", icon: "favorite", path: "/notify" }
    ];

    const [showSetting, setShowSetting] = useState(false);

    const { auth, theme } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const isActive = (pn) => {
        if (pn === pathname) return "active";
    };

    const handleIconProfileClick = () => {
        setShowSetting(!showSetting);
    };

    const handleHoverOutPopup = () => {
        setTimeout(() => {
            setShowSetting(false)
        }, 500);
    }

    return (
        <div className="menu">
            <ul className="navbar-nav flex-row ">
                {navLinks.map((link, index) => (
                    <li
                        className={`nav-item px-1  ${isActive(link.path)}`}
                        key={index}
                    >
                        <Link className="nav-link" to={link.path}>
                            <span className="material-icons">{link.icon}</span>
                        </Link>
                    </li>
                ))}

                <li className="nav-item dropdown">
                    <span
                        className="nav-link dropdown-toggle"
                        href="#"
                        onClick={handleIconProfileClick}
                    >
                        <Avatar
                            src={auth.user.avatar}
                            size="medium-avatar"
                            onClick={handleIconProfileClick}
                        />
                    </span>

                    {/* Dropdown menu setting */}
                    {showSetting && (
                        <Popover className="setting_popover" onHoverOut={handleHoverOutPopup}>
                            <Link
                                className="dropdown-item it-dropdown"
                                to={`/profile/${auth.user._id}`}
                            >
                                Profile
                            </Link>
                            <label
                                htmlFor="theme"
                                className="dropdown-item it-dropdown"
                                to="/"
                                onClick={() =>
                                    dispatch({
                                        type: GLOBALTYPES.THEME,
                                        payload: !theme
                                    })
                                }
                            >
                                {theme ? "Light mode " : "Dark mode"}
                            </label>
                            <div className="dropdown-divider"></div>
                            <Link
                                className="dropdown-item it-dropdown"
                                to="/"
                                onClick={() => dispatch(logout())}
                            >
                                Logout
                            </Link>
                        </Popover>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Menu;

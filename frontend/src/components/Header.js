import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import Avatar from "./Avatar";
const Header = () => {
  const navLinks = [
    { label: "Home", icon: "home", path: "/" },
    { label: "Message", icon: "near_me", path: "/message" },
    { label: "Discover", icon: "explore", path: "/discover" },
    { label: "Notify", icon: "favorite", path: "/notify" },
  ];

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light 
    bg-light justify-content-between align-middle"
    >
      <Link to="/">
        <h1 className="navbar-brand text-uppercase p-0 m-0">Onstagrams</h1>
      </Link>

      <div className="menu">
        <ul className="navbar-nav flex-row ">
          {navLinks.map((link, index) => (
            <li className={`nav-item px-3  ${isActive(link.path)}`} key={index}>
              <Link className="nav-link" to={link.path}>
                <span className="material-icons">{link.icon}</span>
              </Link>
            </li>
          ))}

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <Avatar src={auth.user.avatar} />
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to={`/profile${auth.user._id}`}>
                Profile
              </Link>
              <label
                htmlFor="theme"
                className="dropdown-item"
                to="/"
                onClick={() =>
                  dispatch({ type: GLOBALTYPES.THEME, payload: !theme })
                }
              >
                {theme ? "Light mode " : "Dark mode"}
              </label>
              <div className="dropdown-divider"></div>
              <Link
                className="dropdown-item"
                to="/"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

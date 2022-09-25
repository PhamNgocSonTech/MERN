import React from "react";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";

function HomeLayout({ children }) {
    return (
        <div className="HomeLayout_wrapper">
            <Header />
            <div className="HomeLayout_container">
                <div className="HomeLayout_content">{children}</div>
                <div className="HomeLayout_sidebar">
                    <SideBar />
                </div>
            </div>
        </div>
    );
}

export default HomeLayout;

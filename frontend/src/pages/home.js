import React from "react";
import Posts from "../components/home/Posts";
import Status from "../components/home/Status";
import HomeLayout from "../layouts/HomeLayout";
import { useSelector } from "react-redux";
import LoadIcon from "../images/Infinity-1s-64px.gif";

const Home = () => {
    const { homePosts } = useSelector((state) => state);
    return (
        <HomeLayout>
            <Status />
            {homePosts.loading ? (
                <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            ) : homePosts.result === 0 ? (
                <h2 className="text-center">No Post</h2>
            ) : (
                <Posts />
            )}
        </HomeLayout>
    );
};

export default Home;

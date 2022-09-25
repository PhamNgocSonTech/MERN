import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/Infinity-1s-64px.gif";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    useEffect(async () => {
        if (!search) return;

        try {
            setLoad(true);
            const res = await getDataAPI(
                `search?username=${search}`,
                auth.token
            );
            //mongo data
            setUsers(res.data.users);
            setLoad(false);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            });
        }
    }, [search]);

    const handleClose = () => {
        setSearch("");
        setUsers([]);
    };

    // const handleSearch = async (e) => {
    //     e.preventDefault()
    //     if(!search) return
    //     try{
    //         setLoad(true)
    //         const res = await  getDataAPI(`search?username=${search}`, auth.token)
    //         setUsers(res.data.users)
    //         setLoad(false)

    //     }catch(err){
    //         dispatch({type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg }})

    //     }
    // }
    return (
        <form className="search-form">
            <input
                type="text"
                name="search"
                value={search}
                id="search"
                title="Search"
                onChange={(e) =>
                    setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
                }
            />

            <div className="search-icon" style={{ opacity: search ? 0 : 0.3 }}>
                <span className="material-icons">search</span>
                <span>Enter to search</span>
            </div>

            <div
                className="close-search"
                onClick={handleClose}
                style={{ opacity: users.length === 0 ? 0 : 1 }}
            >
                &times;
            </div>

            <button type="submit" style={{ display: "none" }}>
                Search
            </button>

            {load && <img className="loading" src={LoadIcon} alt="loading" />}

            <div className="users">
                {search &&
                    users.map((user) => (
                        <UserCard
                            key={user._id}
                            user={user}
                            border="border"
                            handleClose={handleClose}
                        />
                    ))}
            </div>
        </form>
    );
};

export default Search;

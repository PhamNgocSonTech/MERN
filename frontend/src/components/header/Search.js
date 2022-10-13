import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import LoadIcon from "../../images/loading.gif";
import Popover from "../popover/Popover";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    const [closeBtn, setCloseBtn] = useState(false);

    useEffect(async () => {
        if (!search) {
            setCloseBtn(false);
            return;
        }

        try {
            setLoad(true);
            setCloseBtn(true);
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

    const handleHoverOut = () => {
        setTimeout(() => {
            setSearch("")
        }, 500);
    }

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

            <div className="search-icon" style={{ opacity: search ? 0 : 0.7 }}>
                <span className="material-icons">search</span>
                <span>Enter to search</span>
            </div>

            {closeBtn && (
                <div className="close-search" onClick={handleClose}>
                    &times;
                </div>
            )}

            <button type="submit" style={{ display: "none" }}>
                Search
            </button>

            {load && <img className="loading" src={LoadIcon} alt="loading" />}

            {/* <div className="users">
                {search && (
                    <>
                        <span className="acc-label">Accounts</span>
                        {users.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                handleClose={handleClose}
                            />
                        ))}
                    </>
                )}
            </div> */}

            <Popover onHoverOut={handleHoverOut}>
                {search && (
                    <>
                        <span className="acc-label">Accounts</span>
                        {users.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                handleClose={handleClose}
                            />
                        ))}
                    </>
                )}
            </Popover>
        </form>
    );
};

export default Search;

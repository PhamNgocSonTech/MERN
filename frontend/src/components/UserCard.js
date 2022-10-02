import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const UserCard = ({
    children,
    user,
    border,
    handleClose,
    setShowFollowers,
    setShowFollowings,
    msg
}) => {
    const handleCloseAll = () => {
        if (handleClose) handleClose();
        if (setShowFollowers) setShowFollowers(false);
        if (setShowFollowings) setShowFollowings(false);
    };
    return (
        <div
            className={`d-flex p-2 align-items-center justify-content-between w-100 ${border} usercard_item`}
        >
            <div>
                <Link
                    to={`/profile/${user._id}`}
                    onClick={handleCloseAll}
                    className="d-flex align-items-center"
                >
                    <Avatar src={user.avatar} size="big-avatar" />

                    <div className="user_details">
                        <span className="user_username">{user.username}</span>
                        <small className="user_fullname">{user.fullname}</small>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    );
};

export default UserCard;

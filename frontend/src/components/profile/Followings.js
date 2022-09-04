import React from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";

const Followings = ({ users, setShowFollowings }) => {
  const { auth } = useSelector((state) => state);
  return (
    <div className="follow">
      <div className="follow-box">
        <h5 className="text-center">Followings</h5>
        <hr />

        <div className="follow-content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowings={setShowFollowings}
            >
              {auth.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>

        <div className="close" onClick={() => setShowFollowings(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Followings;

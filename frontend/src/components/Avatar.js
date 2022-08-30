import React from "react";
import {useSelector, useDispatch  } from 'react-redux'

const Avatar = ({src, size}) => {
  const {theme} =useSelector((state) => state);
  return (
    <img
      src={src}
      alt="avatar"
      className={size}
      style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
    ></img>
  );
};

export default Avatar;

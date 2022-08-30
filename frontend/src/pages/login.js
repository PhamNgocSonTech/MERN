import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login, googleLogin } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import "../styles/auth.css";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;
  const [typePass, setTypeData] = useState(false);
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    //[name]: value =>> email : dev@gamil.com
    //...userData => {email : dev@gamil.com , password : ''}
    //if dont use ...userData,
    // a previous data willbe lost like: {email : dev@gamil.com ,null}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(login(userData));
  };

  const handleGoogleLogin = async (googleData) => {
    const dataParse =  jwtDecode(googleData.credential) ;
    console.log(dataParse);

    dispatch(googleLogin(dataParse));
  };

    const handleGoogleFailure = () => {
    console.log("Failure");
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Onstagram</h3>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypeData(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <p className="my-2">
          You don't have an account?{" "}
          <Link to="/register" style={{ color: "crimson" }}>
            Register Now
          </Link>
        </p>
        <GoogleLogin
          buttonText="Login in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleFailure}
          cookiePolicy={"single_host_origin"}
        ></GoogleLogin>
      </form>
    </div>
  );
}

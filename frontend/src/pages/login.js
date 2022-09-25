import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { login, googleLogin, githubLogin } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import "../styles/auth.css";
import jwtDecode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
    const initialState = { email: "", password: "" };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;
    const [typePass, setTypeData] = useState(false);
    const { auth } = useSelector((state) => state);

    const GITHUB_CLIENT_ID = "c1a9b1615a6dacb34f42";
    const gitHubRedirectURL = "http://localhost:5000/api/auth/github";
    const path = "/";

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
        const dataParse = jwtDecode(googleData.credential);
        console.log(dataParse);

        dispatch(googleLogin(dataParse));
    };

    const handleGoogleFailure = () => {
        console.log("Failure");
    };

    useEffect(() => {
        (async function () {
            const u = await axios
                .get(`http://localhost:5000/api/me`, {
                    withCredentials: true
                })
                .then((res) => res.data);
            console.log(u);
            dispatch(githubLogin(u));
        })();
    }, []);

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
                <div className="custom-btn">
                    <GoogleLogin
                        text="signin with Google"
                        // size="medium"
                        shape="rectangular"
                        // locale="circle"
                        ux_mode="popup"
                        cancel_on_tap_outside
                        context="signin"
                        theme="outline"
                        width="70"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                    <a
                        href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${gitHubRedirectURL}?path=${path}&scope=user:email`}
                    >
                        <img
                            src="https://coderwall-assets-0.s3.amazonaws.com/uploads/picture/file/4363/github.png"
                            alt="Sign in with GitHub"
                        />
                    </a>
                </div>
            </form>
        </div>
    );
}

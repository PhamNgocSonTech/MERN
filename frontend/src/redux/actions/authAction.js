import { postDataAPI, postGGDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "./globalTypes";
import valid from '../../utils/valid';
import { withCookies, Cookies } from "react-cookie";

export const TYPES = {
  AUTH: "AUTH",
};

export const googleLogin = (data) => async (dispatch) => {
  dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
  const res = await postGGDataAPI("google_login", data);
  console.log(res);
  
  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      token: res.data.access_token,
      user: res.data.user,
    },
  });
  dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
};

export const githubLogin = (data) => async (dispatch) => {
  console.log("git hub");
  if (data) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: data.access_token,
        user: data.user,
      },
    });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    localStorage.setItem("firstLogin", true);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);
   console.log(res);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    try {
      const res = await postDataAPI("refresh_token");
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};
export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI("register", data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("firstLogin", true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    await postDataAPI("logout");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

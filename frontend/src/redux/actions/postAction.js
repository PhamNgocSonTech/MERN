import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";

export const POST_TYPES = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
};

export const createPost = ({ content, images, auth }) => async (dispatch) => {
    let media = [];
    
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

      if (images.length > 0) media = await imageUpload(images);
      const res = await postDataAPI(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({ type: POST_TYPES.CREATE_POST, payload: res.data.newPost });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPES.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: res.data,
    });

    dispatch({ type: POST_TYPES.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

import { GLOBALTYPES } from './globalTypes'
import { POST_TYPES } from './postAction'
import { postDataAPI } from '../../utils/fetchData'


export const createComment = (post, newComment, auth) => async (dispatch) => {
    const newPost = {...post, comments: [...post.comments, newComment]}
    
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})

    try {
        // const data = { ...newComment, postId: post._id}
        // const res = await postDataAPI('comment', data, auth.token)
        const data = {...newComment, postId: post._id, postUserId: post.user._id}
        const res = await postDataAPI('comment', data, auth.token)
        console.log('check res',res);
    }catch (err) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg} })
    }
}   
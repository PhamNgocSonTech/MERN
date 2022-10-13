import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
import EmojiPicker from "emoji-picker-react";
import icon from "../../images/emote.svg";

const InputComment = ({ children, post }) => {
    const [content, setContent] = useState(""); //const [text, setText] = useState('')
    const [isShowEmote, setIsShowEmote] = useState(false); //const [isShow, setIsShow] = useState(false)
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        setContent("");
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString()
        };
        dispatch(createComment(post, newComment, auth));
    };

    const handleTextChange = (e) => {
        setContent(e.target.value)
    } 

    const handleIconChoose = (icon, e) => {
        setContent(pre => pre.concat(icon.emoji))
    };

    const handleShowHideEmoteIcon = (e) => {
        setIsShowEmote(!isShowEmote);
    };

    const handleLeavePicker = () => {
        setIsShowEmote(false)
    }
    return (
        <form className="card-footer comment-input " onSubmit={handleSubmit}>
            {children}
            <div
                className="d-flex mr-3 position-relative emote-section"
                onClick={handleShowHideEmoteIcon}
            >
                <img alt="icon" src={icon}></img>
                {isShowEmote && (
                    <div className="position-absolute emote-picker" onClick={(e) => e.stopPropagation()} onMouseLeave={handleLeavePicker}>
                        <EmojiPicker emojiStyle="facebook" onEmojiClick={handleIconChoose} theme="light"/>
                    </div>
                )}
            </div>
            <input
                className="h6-font-size"
                type="text"
                placeholder="Add your comment..."
                value={content}
                onChange={handleTextChange}
            />

            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    );
};

export default InputComment;

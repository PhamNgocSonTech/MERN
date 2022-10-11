import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import icon from "../../images/emote.svg";

const InputComment = ({ children, post }) => {
    const [content, setContent] = useState("");
    const [isShowEmote, setIsShowEmote] = useState(false);
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

    const handleIconChoose = (icon) => {
        setContent((pre) => pre + icon.emoji);
    };

    const handleShowHideEmoteIcon = () => {
        setIsShowEmote(!isShowEmote);
    };
    return (
        <form className="card-footer comment-input " onSubmit={handleSubmit}>
            {children}
            <div
                className="d-flex mr-3 position-relative emote-section"
                onClick={handleShowHideEmoteIcon}
            >
                <img src={icon}></img>
                {isShowEmote && (
                    <div className="position-absolute emote-picker">
                        <EmojiPicker
                            onEmojiClick={handleIconChoose}
                            emojiStyle="facebook"
                            lazyLoadEmojis={true}
                        />
                    </div>
                )}
            </div>
            <input
                className="h6-font-size"
                type="text"
                placeholder="Add your comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit" className="postBtn">
                Post
            </button>
        </form>
    );
};

export default InputComment;

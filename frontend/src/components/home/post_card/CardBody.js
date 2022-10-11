import React, { useState } from "react";
import Carousel from "../../Carousel";
import CardFooter from "./CardFooter";

const CardBody = ({ post }) => {
    const [readMore, setReadMore] = useState(false);

    // const handleReadMore = ()
    return (
        <div className="card-body p-0">
            {post.images.length > 0 && (
                <div className="cart-img-post">
                    <Carousel images={post.images} id={post._id} />
                </div>
            )}
            <CardFooter post={post} />
            <div className="card-body-content">
                <span>
                    {post.content.length < 60 ? (
                        <div>
                            <span className="m-0 un-cap">
                                {post.user.username}
                                {"  "}
                            </span>
                            <span className="content-cap">{post.content}</span>
                        </div>
                    ) : readMore ? (
                        post.content + " "
                    ) : (
                        post.content.slice(0, 60) + "..."
                    )}
                </span>
                {post.content.length > 60 && (
                    <span
                        className="readMore"
                        onClick={() => setReadMore(!readMore)}
                    >
                        {readMore ? "Hide content" : "Read more"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default CardBody;

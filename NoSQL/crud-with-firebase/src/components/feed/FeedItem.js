// src/components/FeedItem.js
import React from "react";
import DeleteBtn from "../deletebtn/DeleteBtn";

const FeedItem = ({ feed },{user}) => {
    return (
        <div className="post-container">
            <div className="post">
                <h1>{feed.userName}</h1>
                <span className="post-description">
                    <pre className="post-description" rows={15} cols={15} disabled>
                        {feed.description}
                    </pre>
                </span>
                {feed.img && (
                    <img
                        src={feed.img}
                        alt={feed.title}
                        className="post-image"
                    />
                )}
                <div className="post-footer">
                    <span className="post-date">
                        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </span>

                    <button className="like-button">👍 Like</button>
                    <DeleteBtn docId={feed.id} />
                </div>
            </div>
        </div>
    );
};

export default FeedItem;

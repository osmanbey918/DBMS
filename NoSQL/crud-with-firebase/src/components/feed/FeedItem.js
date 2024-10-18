// src/components/FeedItem.js
import React from "react";

const FeedItem = ({ feed }) => {
    return (
        <div className="post">
            <h2 className="post-title">{feed.title}</h2>
            <p className="post-description">{feed.description}</p>
            {feed.img && (
                <img
                    src={feed.img}
                    alt={feed.title}
                    className="post-image"
                />
            )}
        </div>
    );
};

export default FeedItem;

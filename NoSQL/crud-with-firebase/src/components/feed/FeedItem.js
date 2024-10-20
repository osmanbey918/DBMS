// src/components/FeedItem.js
import React from "react";

const FeedItem = ({ feed }) => {
    return (
        <div className="post-container">
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
                <div className="post-footer">
                    <span className="post-date">{new Date().toLocaleDateString()}</span>
                    <button className="like-button">👍 Like</button>
                </div>
            </div>
        </div>
    );
};

export default FeedItem;

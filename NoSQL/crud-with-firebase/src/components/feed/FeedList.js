// src/components/FeedList.js
import React from "react";
import FeedItem from "./FeedItem";

const FeedList = ({ feeds },{users}) => {
    return (
        <div>
            {feeds.map((feed) => (
                <FeedItem key={feed.id} feed={feed} />
            ))};
             {/* {users.map((user) => (
                <FeedItem key2={user.id} user={user} />
            ))} */}
        </div>
    );
};

export default FeedList;

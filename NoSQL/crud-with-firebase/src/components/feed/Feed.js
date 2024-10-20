// src/components/Feed.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchFeedData } from "../../store/slices/feedSlice";
import FeedForm from "./FeedForm";
import FeedList from "./FeedList";

const Feed = () => {
    const dispatch = useDispatch();
    const c = useSelector((state) => state.feed.value);
    const { feeds, loading, error } = useSelector((state) => state.feed);

    const [isBoxVisible, setIsBoxVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchFeedData());
    }, [dispatch]);

    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    return (
        <div className="container">
            <button onClick={toggleBox}>
                {isBoxVisible ? 'Done' : 'Create Post'}
            </button>
            {isBoxVisible && <FeedForm onClose={toggleBox} />}

            <FeedList feeds={feeds} />

            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Feed;

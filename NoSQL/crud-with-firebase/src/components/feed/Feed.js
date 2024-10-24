// src/components/Feed.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedData, fetchUserName } from "../../store/slices/feedSlice";
import FeedForm from "./FeedForm";
import FeedList from "./FeedList";

const Feed = () => {
    const dispatch = useDispatch();
    const c = useSelector((state) => state.feed);
    const { feeds, loading, error } = useSelector((state) => state.feed);

    const [isBoxVisible, setIsBoxVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchFeedData());
        dispatch(fetchUserName());
    }, [dispatch]);

    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible);no
    };

    return (
        <div className="container">
            <div className="create-btn-con">
                <button onClick={toggleBox} className="create-btn">
                    Create Post
                </button>
            </div>
            {isBoxVisible && <FeedForm onClose={toggleBox} />}

            <FeedList feeds={feeds} />

            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Feed;

// src/components/Feed.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedData } from "../../store/slices/feedSlice";
import FeedForm from "./FeedForm";
import { fetchUserName } from "../../store/slices/userSlice";
import FeedList from "./FeedList";
import Modal from "../common/Modal";

const Feed = () => {
    const { feeds, loading, error } = useSelector((state) => state.feed); 
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchFeedData());
        dispatch(fetchUserName());
    }, [dispatch]);

    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    return (
        <div className="Feed-container">
            <div className="feed-header">
                <h1 className='feedstxt'>Feeds</h1>
                <div className="create-btn-container">
                    <button onClick={toggleBox} className="create-btn">
                        Create Post
                    </button>
                </div>
            </div>
            <Modal isOpen={isBoxVisible} onClose={toggleBox}>
                <FeedForm onClose={toggleBox} />
            </Modal>
            <FeedList feeds={feeds} />
            {/* <User/> */}
            {error && <p className="error-message">Error: {error}</p>} 
        </div>
    );
};

export default Feed;

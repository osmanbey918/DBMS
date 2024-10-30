// src/components/Feed.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedData } from "../../store/slices/feedSlice";
import FeedForm from "./FeedForm";
import { fetchUserName } from "../../store/slices/userSlice";
import FeedList from "./FeedList";
import User from "./User";

const Feed = () => {
    const { feeds, loading, error} = useSelector((state) => state.feed); // Combined useSelector to avoid redundancy
    const {users} = useSelector((state) => state.user); // Combined useSelector to avoid redundancy
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const dispatch = useDispatch();
    const activeUser = users && users.length > 0 ? users[0] : null;
    useEffect(() => {
        dispatch(fetchFeedData());
        dispatch(fetchUserName());
    }, [dispatch]);

    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible); 
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
            <User users={activeUser}/>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default Feed;

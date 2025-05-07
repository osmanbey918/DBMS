
import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedData } from "../../store/slices/feedSlice";
import FeedList from "./FeedList";

const Feed = () => {
    const { feeds, loading, error } = useSelector((state) => state.feed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeedData());

    }, [dispatch]);

    return (
        <div className="Feed-container">
            <div className="feed-header">
                <h1 className="feedstxt">Feeds</h1>
            </div>
            <FeedList feeds={feeds} />

            {error && <p className="error-message">Error: {error}</p>}
        </div>
    );
};

export default Feed;

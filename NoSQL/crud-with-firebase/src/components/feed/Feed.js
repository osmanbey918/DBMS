// src/components/Feed.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, addFeedData, fetchFeedData } from "../../store/slices/feedSlice";

const Feed = () => {
    const dispatch = useDispatch();
    const c = useSelector((state) => state.feed.value);
    const { feeds, loading, error } = useSelector((state) => state.feed);

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        // Fetch data from Firestore when the component mounts
        dispatch(fetchFeedData());
    }, [dispatch]);

    const clickhandle = () => {
        dispatch(increment());
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const submit = (event) => {
        event.preventDefault();
        dispatch(addFeedData(formData)); // Save data to Firestore and Redux store
        setFormData({ title: '', description: '' }); // Reset form fields
    };

    return (
        <div>
            <div className="container">
                <form onSubmit={submit}>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>

                {/* Display data from Redux store */}
                {feeds.map((feed) => (
                    <div key={feed.id}>
                        <p>{feed.title}</p>
                        <p>{feed.description}</p>
                    </div>
                ))}

                {error && <p>Error: {error}</p>}

                <p>{c}</p>
                <button onClick={clickhandle}>+</button>
            </div>
        </div>
    );
};

export default Feed;

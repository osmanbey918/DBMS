import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData, uploadImage } from "../../store/slices/feedSlice";
import { selectCurrentUser } from '../../store/slices/userSlice';

const FeedForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        img: null
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "img" ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            const imageUrl = formData.img
                ? await dispatch(uploadImage(formData.img)).unwrap()
                : null;

            await dispatch(addFeedData({
                title: formData.title,
                description: formData.description,
                img: imageUrl,
                userName: currentUser?.name || "Guest",
                uid: currentUser?.uid || null
            })).unwrap();

            setMessage({ type: 'success', text: 'Post created successfully!' });
            setFormData({ title: '', description: '', img: null });
            onClose();
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Failed to post. Please try again.' });
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="feed-form">
                {message.text && (
                    <div className={`form-message ${message.type}`}>
                        {message.text}
                    </div>
                )}
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Share more details..."
                    rows="5"
                    required
                />

                <label htmlFor="img">Upload Image</label>
                <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button type="submit" className="submit-btn">Post</button>
            </form>
        </div>
    );
};

export default FeedForm;

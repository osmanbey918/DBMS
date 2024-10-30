// src/components/FeedForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeedData, uploadImage } from "../../store/slices/feedSlice";

const FeedForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user); // Get users from state
    const activeUser = users && users.length > 0 ? users[0] : null; // Select the active user

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        img: null
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "img" ? files[0] : value // Handle file input for image
        }));
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            // If an image is selected, upload it first to get the URL
            const imageUrl = formData.img
                ? await dispatch(uploadImage(formData.img)).unwrap()
                : null;

            // Dispatch addFeedData with form data and active user's name
            await dispatch(addFeedData({ 
                title: formData.title, 
                description: formData.description, 
                img: imageUrl,
                userName: activeUser ? activeUser.name : "Guest" // Use active user's name or default to "Guest"
            })).unwrap();

            // Reset the form and close it
            setFormData({ title: '', description: '', img: null });
            onClose();
        } catch (error) {
            console.error("Failed to upload image or add feed data:", error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={submit}>
                {/* <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter title"
                /> */}

                <label htmlFor="description">Description</label>
                <textarea
                    cols={12}
                    rows={12}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                />

                <label htmlFor="img">Upload Image</label>
                <input
                    type="file"
                    name="img"
                    onChange={handleChange}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FeedForm;

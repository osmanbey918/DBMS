// src/components/FeedForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedData, uploadImage } from "../../store/slices/feedSlice";

const FeedForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        img: null // Change this to hold the file object
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "img" ? files[0] : value // Store file for img
        }));
    };

    const submit = async (event) => {
        event.preventDefault();

        // First, upload the image
        if (formData.img) {
            try {
                const imageUrl = await dispatch(uploadImage(formData.img)).unwrap(); // Get the image URL
                console.log("Image URL:", imageUrl); // Debug log to check URL

                // Then, add the feed data along with the image URL
                await dispatch(addFeedData({ 
                    title: formData.title, 
                    description: formData.description, 
                    img: imageUrl // Use the uploaded image URL
                })).unwrap(); // Unwrap to handle any errors
            } catch (error) {
                console.error("Failed to upload image or add feed data:", error);
            }
        }

        // Reset the form and close it
        setFormData({ title: '', description: '', img: null });
        onClose(); // Close the form after submission
    };

    return (
        <div className="form-container">
            <form onSubmit={submit}>
                {/* <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                /> */}
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
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

// src/components/FeedForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFeedData } from "../../store/slices/feedSlice";

const FeedForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        img: ''

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submit = (event) => {
        event.preventDefault();
        dispatch(addFeedData(formData));
        setFormData({ title: '', description: '',img:'' });
        onClose(); // Close the form after submission
    };

    return (
        <div className="form-container">
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

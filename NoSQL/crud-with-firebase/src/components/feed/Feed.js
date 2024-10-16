import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../store/slices/feedslice";

const Feed = () => {
    const dispatch = useDispatch();
    const c = useSelector((state) => state.feed.value);

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const [submittedData, setSubmittedData] = useState( []);

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
        event.preventDefault(); // Prevent page reload
        setSubmittedData([...submittedData, formData]); // Add formData to submittedData array
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
                    <button type="submit">Submit</button>
                </form>

                {/* Display submitted data */}
                {submittedData.map((data, index) => (
                    <div key={index}>
                        <p>{data.title}</p>
                        <p>{data.description}</p>
                    </div>
                ))}

                <p>{c}</p>
                <button onClick={clickhandle}>+</button>
            </div>
        </div>
    );
};

export default Feed;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
function Feed2() {
    const dispatch = useDispatch();
    const [ formdata, setformdata ] = useState({
        title: '',
        description: ''
    });
    const [submitteddata, setsubmitteddata] = useState([]);
    const onchangehandler = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
    };
    const onsubmithandler = (e) => {
        e.preventDefault();
        setsubmitteddata([...submitteddata, formdata]);

        setformdata({ title: '', description: '' })
    }
    return (
        <div>
            <form onSubmit={onsubmithandler}>
                <label>title</label>
                <input type="text" name='title' value={formdata.title} onChange={onchangehandler} />
                <label>description</label>
                <input type="text" name='description' value={formdata.description} onChange={onchangehandler} />
                <button type="submit">submit</button>
            </form>
            {submitteddata.map((data, index) => (
                <div key={index}>
                    <p>{data.title}</p>
                    <p>{data.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Feed2;
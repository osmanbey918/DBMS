import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../store/slices/feedslice";

const Feed = () =>{
    const dispatch = useDispatch();
    const c = useSelector((state) => state.feed.value);
    const clickhandle = dispatch(increment())
    return(
        <button onClick={clickhandle}>+{c}</button>
    )
}

export default Feed;
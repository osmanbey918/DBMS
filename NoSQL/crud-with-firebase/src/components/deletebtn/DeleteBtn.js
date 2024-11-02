import React from "react";
import { useDispatch } from "react-redux";
import { deleteFeedData } from "../../store/slices/feedSlice";

const DeleteBtn = ({docId }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    dispatch(deleteFeedData(id))
  };

  return (
    <button onClick={()=>{handleDelete(docId)}} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteBtn;

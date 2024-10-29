// src/deletebtn/DeleteBtn.js
import React from "react";
import { db } from "../../config/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { deleteFeedData } from "../../store/slices/feedSlice";
const DeleteBtn = ({ collectionName, docId }) => {
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    // try {
    //   await deleteDoc(doc(db, collectionName, docId));
    //   console.log(`Document with ID "${docId}" has been successfully deleted.`);
    // } catch (error) {
    //   console.error("Error deleting document:", error);
    // }
    dispatch(deleteFeedData(id))
  };

  return (
    <button onClick={()=>{handleDelete(docId)}} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteBtn;

// src/deletebtn/DeleteBtn.js
import React from "react";
import { db } from "../../config/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteBtn = ({ collectionName, docId }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      console.log(`Document with ID "${docId}" has been successfully deleted.`);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
};

export default DeleteBtn;

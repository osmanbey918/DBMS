import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFeedData } from "../../store/slices/feedSlice";

const DeleteBtn = ({ docId }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError("");
      await dispatch(deleteFeedData(docId)).unwrap();
    } catch (err) {
      setError("❌ Failed to delete post. Please try again.");
      console.error("Delete error:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-btn-container">
      {error && <p className="delete-error">{error}</p>}
      <button
        onClick={handleDelete}
        className="delete-button"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "🗑️ Delete"}
      </button>
    </div>
  );
};

export default DeleteBtn;

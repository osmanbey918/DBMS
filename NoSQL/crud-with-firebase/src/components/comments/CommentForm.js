import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../store/slices/feedSlice';

export default function CommentForm({ feedId }) {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const comment = {
      text: commentText,
      userName: currentUser.name,
      uid: currentUser.uid,
      createdAt: new Date().toISOString(), // Optional: Timestamp for comment creation
    };

    try {
      await dispatch(addComment({ feedId, comment })).unwrap();
      setCommentText(''); // Clear the input after successful submission
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write a comment..."
        className="comment-input"
        rows={3}
      />
      <button type="submit" className="comment-submit" disabled={!commentText.trim()}>
        Post Comment
      </button>
    </form>
  );
}

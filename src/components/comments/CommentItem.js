import React from "react";

export default function CommentItem({ comment }) {
  return (
    <div className="comment-item">
      <div className="comment-author"><strong>{comment.userName}</strong></div>
      <div className="comment-text">{comment.text}</div>
      <div className="comment-date">
        🕒 {new Date(comment.createdAt).toLocaleString()}
      </div>
    </div>
  );
}

import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <div className="empty-comments">No comments yet.</div>;
  }
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
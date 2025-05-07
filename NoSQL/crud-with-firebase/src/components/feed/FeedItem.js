import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteBtn from "../deletebtn/DeleteBtn";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import Modal from "../common/Modal";

const FeedItem = ({ feed }) => {
    const currentUser = useSelector((state) => state.auth.user);
    const isOwner = currentUser?.uid === feed.uid;
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => setShowComments(!showComments);

    return (
        <div className="post-container">
            <div className="post-card">
                <div className="post-header">
                    <h2>{feed.userName || "Anonymous"}</h2>
                    <p className="post-date">
                        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </p>
                </div>

                <div className="post-content">
                    <p>{feed.description}</p>
                    {feed.img && (
                        <img
                            src={feed.img}
                            alt={feed.title}
                            className="post-image"
                        />
                    )}
                </div>

                <div className="post-actions">
                    <button className="like-btn">👍 Like</button>
                    <button className="comment-btn" onClick={toggleComments}>
                        💬 Comments
                    </button>
                    {isOwner && <DeleteBtn docId={feed.id} />}
                </div>
            </div>

            <Modal isOpen={showComments} onClose={toggleComments}>
                <div className="comments-section">
                    <h3>Comments</h3>
                    <CommentList comments={feed.comments || []} />
                    <CommentForm feedId={feed.id} />
                </div>
            </Modal>
        </div>
    );
};

export default FeedItem;

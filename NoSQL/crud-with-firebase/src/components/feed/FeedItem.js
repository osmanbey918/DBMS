// src/components/FeedItem.js
import React, { useState } from "react";
import DeleteBtn from "../deletebtn/DeleteBtn";
import { useSelector } from "react-redux";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import Modal from "../common/Modal";

const FeedItem = ({ feed }) => {
    const currentUser = useSelector((state) => state.auth.user);
    const isOwner = currentUser && feed.uid && currentUser.uid === feed.uid;
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="post-container">
            <div className="post">
                <h1>{feed.userName}</h1>
                <span className="post-description">
                    <pre className="post-description" rows={15} cols={15} disabled>
                        {feed.description}
                    </pre>
                </span>
                {feed.img && (
                    <img
                        src={feed.img}
                        alt={feed.title}
                        className="post-image"
                    />
                )}
                <div className="post-footer">
                    <span className="post-date">
                        {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                    </span>
                    <div className="post-actions">
                        <button className="like-button">👍 Like</button>
                        <button className="comment-button" onClick={() => setShowComments(true)}>
                            💬 Comments
                        </button>
                        {isOwner && <DeleteBtn docId={feed.id} />}
                    </div>
                </div>
                <Modal isOpen={showComments} onClose={() => setShowComments(false)}>
                    <div className="comments-section">
                        <h3>Comments</h3>
                        <CommentList comments={feed.comments || []} />
                        <CommentForm feedId={feed.id} />
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default FeedItem;

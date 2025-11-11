import React, { useState } from "react";
import CommentList from "./CommentList";
import AddCommentForm from "./AddCommentForm";

function PostItem({ post, currentUser, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(post.content);

  async function deletePost() {
    await fetch(`http://localhost:3000/posts/${post.id}`, { method: "DELETE" });
    onUpdate();
  }

  async function savePost() {
    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });
    setEditing(false);
    onUpdate();
  }

  return (
    <div
      style={{
        border: expanded ? "2px solid black" : "1px solid gray",
        padding: "10px",
        marginBottom: "5px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          <strong>ID: {post.id}</strong> | <span>{post.title}</span>
        </span>
        <div>
          <button onClick={() => setExpanded(!expanded)}>Select</button>
          {currentUser.id === post.userid && (
            <>
              <button onClick={deletePost}>Delete</button>
              <button onClick={() => setEditing(!editing)}>Edit</button>
            </>
          )}
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: "10px" }}>
          {editing ? (
            <>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button onClick={savePost}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          ) : (
            <p>{post.content}</p>
          )}

          <button onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>

          {showComments && (
            <>
              <CommentList
                postId={post.id}
                currentUser={currentUser}
                onUpdate={onUpdate}
              />
              <AddCommentForm
                postId={post.id}
                currentUser={currentUser}
                onAdd={onUpdate}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PostItem;

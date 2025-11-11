import React, { useState, useEffect } from "react";

function CommentList({ postId, currentUser, onUpdate }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/comments?postid=${postId}`)
      .then((res) => res.json())
      .then(setComments);
  }, [postId, onUpdate]);

  async function deleteComment(commentId, userId) {
    if (userId !== currentUser.id) return;
    await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
    });
    onUpdate();
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.text}{" "}
          {comment.userid === currentUser.id && (
            <button onClick={() => deleteComment(comment.id, comment.userid)}>
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CommentList;

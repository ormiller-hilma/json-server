import React, { useState } from "react";

function AddCommentForm({ postId, currentUser, resetData }) {
  const [text, setText] = useState("");
  async function handleAdd() {
    if (!text.trim()) return;
    await fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postid: postId, userid: currentUser.id, text }),
    });
    setText("");
    resetData();
  }

  return (
    <div>
      <input
        placeholder="Add comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>Add Comment</button>
    </div>
  );
}

export default AddCommentForm;

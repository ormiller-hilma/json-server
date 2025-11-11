import React, { useState } from "react";

function AddPostForm({ user, onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleAdd() {
    if (!title.trim() || !content.trim()) return;
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid: user.id, title, content }),
    });
    setTitle("");
    setContent("");
    onAdd();
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAdd}>Add Post</button>
    </div>
  );
}

export default AddPostForm;

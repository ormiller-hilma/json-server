import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";
import { UserContext } from "../contexts/UserContx";
import PostItem from "../components/PostItem";
import AddPostForm from "../components/AddPostForm";

function PostDisplay() {
  const { user } = useContext(UserContext);
  const { userid } = useParams();

  const {
    data: posts,
    loading,
    resetData,
  } = useFetch(
    `http://localhost:3000/posts${userid ? `?userid=${userid}` : ""}`
  );

  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter(
    (post) =>
      post.id.includes(search) ||
      post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>{user.username}'s Posts</h2>

      <AddPostForm user={user} onAdd={resetData} />

      <input
        type="text"
        placeholder="Search by ID or title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "1rem 0" }}
      />

      {loading && <p>Loading...</p>}
      {!loading && filteredPosts.length === 0 && <p>No posts found</p>}
      {!loading &&
        filteredPosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            currentUser={user}
            onUpdate={resetData}
          />
        ))}
    </div>
  );
}

export default PostDisplay;

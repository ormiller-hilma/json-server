import React, { useState, useContext } from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";
import { UserContext } from "../contexts/UserContx";
import PostItem from "../components/PostItem";
import AddPostForm from "../components/AddPostForm";
import { useEffect } from "react";

function PostDisplay() {
  const { user } = useContext(UserContext);
  const { userid } = useParams();
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [search, setSearch] = useState("");

  const [url, setUrl] = useState(
    `http://localhost:3000/posts?userid=${userid}`
  );
  useEffect(() => {
    setUrl(
      showAllUsers
        ? `http://localhost:3000/posts`
        : `http://localhost:3000/posts?userid=${userid}`
    );
  }, [userid, showAllUsers]);
  const { data: posts, loading, resetData } = useFetch(url);

  const filteredPosts = posts.filter(
    (post) =>
      post.id.includes(search) ||
      post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>{user.username}'s Posts</h2>

      <label>
        <input
          type="checkbox"
          checked={showAllUsers}
          onChange={() => {
            setShowAllUsers((prev) => !prev);
            console.log(url);
            resetData();
          }}
        />
        Show posts of all users
      </label>

      {!showAllUsers && <AddPostForm user={user} onAdd={resetData} />}

      <input
        type="text"
        placeholder="Search by ID or title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
            showAllUsers={showAllUsers}
          />
        ))}
    </div>
  );
}

export default PostDisplay;

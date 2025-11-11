import React from "react";
import useFetch from "../hooks/UseFetch";
import { useParams } from "react-router";

function PostDisplay() {
  const { userid } = useParams();

  const fetch = useFetch(`http://localhost:3000/posts?userid=${userid}`);
  const data = fetch.data;

  // fix keys:
  return (
    <>
      {fetch.loading && <h2>Loading...</h2>}
      {!fetch.loading &&
        data.map((post, index) => {
          return (
            <>
              <h2 key={`title ${index}`}>{post.title}</h2>
              <p key={`content ${index}`}>{post.content}</p>
            </>
          );
        })}
    </>
  );
}

export default PostDisplay;

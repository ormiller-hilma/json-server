import React, { Component } from "react";
import useFetch from "../hooks/UseFetch";
import { useParams } from "react-router";
import { Fragment } from "react";

function PostDisplay() {
  const { userid } = useParams();

  async function handleDelete(id) {
    await fetch(`http://localhost:3000/posts/${id}`, { method: "DELETE" });
  }

  const fetchedData = useFetch(`http://localhost:3000/posts?userid=${userid}`);
  const data = fetchedData.data;

  return (
    <>
      {fetchedData.loading && <h2>Loading...</h2>}
      {/* {!fetchedData.loading && <h1>{postAmount} Posts</h1>} */}
      {!fetchedData.loading &&
        data.map((post, index) => {
          return (
            <Fragment key={`post ${index}`}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <button
                onClick={
                  () => {}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  // useFetch(
                  //   `http://localhost:3000/posts/${post.id}`, "Delete"
                  // )
                }
              >
                Delete Post
              </button>
            </Fragment>
          );
        })}
    </>
  );
}

export default PostDisplay;

import React from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../hooks/UseFetch";
import { Fragment } from "react";
import { useState } from "react";

async function handleAdd(data, albumid, resetData) {
  if (data === "") return;
  await fetch("http://localhost:3000/photos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ albumid: albumid, url: data }),
  });

  resetData();
}

async function handleDelete(resetData, photoId) {
  await fetch(`http://localhost:3000/photos/${photoId}`, { method: "DELETE" });
  resetData();
}

function AlbumsDisplay() {
  const { userid, albumid, pageid } = useParams();
  const navigate = useNavigate();
  const [imageInput, setImageInput] = useState("");

  const page = Number(pageid);
  const limit = 4;

  const start = limit * (pageid - 1);

  const fetch = useFetch(
    `http://localhost:3000/photos?albumid=${albumid}&_start=${start}&_limit=${limit}`
  );
  const photoArray = fetch.data;

  const nextFetch = useFetch(
    `http://localhost:3000/photos?albumid=${albumid}&_start=${
      start + limit
    }&_limit=${limit}`
  );

  return (
    <>
      <h1>{fetch.data.name}</h1>

      {fetch.loading && <h2>Loading...</h2>}

      {!fetch.loading && pageid - 1 > 0 && (
        <button
          onClick={() => {
            navigate(
              `/home/users/${userid}/albums/${albumid}/page/${page - 1}`,
              {
                replace: true,
              }
            );
            fetch.resetData();
          }}
        >
          Prev
        </button>
      )}

      {!fetch.loading &&
        photoArray.length >= limit &&
        !nextFetch.loading &&
        nextFetch.data.length !== 0 && (
          <button
            onClick={() => {
              navigate(
                `/home/users/${userid}/albums/${albumid}/page/${page + 1}`,
                {
                  replace: true,
                }
              );
              fetch.resetData();
              nextFetch.resetData();
            }}
          >
            Next
          </button>
        )}

      <br />

      {!fetch.loading &&
        photoArray.map((photo, index) => {
          return (
            <Fragment key={`${index} ${pageid - 1}`}>
              <img src={photo.url} style={{ maxWidth: 250, maxHeight: 250 }} />
              <button
                onClick={() => {
                  handleDelete(fetch.resetData, photo.id);
                }}
              >
                Delete
              </button>
            </Fragment>
          );
        })}

      {!fetch.loading && (
        <>
          <br />
          <input
            type="text"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <button
            onClick={() => {
              handleAdd(imageInput, albumid, fetch.resetData);
              setImageInput("");
            }}
          >
            Add Photo
          </button>
        </>
      )}
    </>
  );
}

export default AlbumsDisplay;

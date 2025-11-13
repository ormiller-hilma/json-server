import React from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../hooks/UseFetch";
import { Fragment } from "react";
import { useState } from "react";
import "../styles/Album.css";

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

function navigatePage(navigate, path) {
  navigate(path, {
    replace: true,
  });
}

function AlbumsDisplay() {
  const { userid, albumid, pageid } = useParams();
  const navigate = useNavigate();
  const [imageInput, setImageInput] = useState("");

  const path = `/home/users/${userid}/albums/${albumid}/page/`;

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

      {!fetch.loading && pageid > 1 && (
        <button
          onClick={() => {
            navigatePage(navigate, path + (page - 1));
            fetch.resetData();
          }}
        >
          Prev
        </button>
      )}

      {!fetch.loading && !nextFetch.loading && nextFetch.data.length !== 0 && (
        <button
          onClick={() => {
            navigatePage(navigate, path + (page + 1));
            fetch.resetData();
            nextFetch.resetData();
          }}
        >
          Next
        </button>
      )}

      <br />

      <div className="album-container">
        {!fetch.loading &&
          photoArray.map((photo) => {
            return (
              <Fragment key={photo.id}>
                <div className="album">
                  <img
                    src={photo.url}
                    style={{ maxWidth: 250, maxHeight: 250 }}
                  />
                  <button
                    onClick={() => handleDelete(fetch.resetData, photo.id)}
                  >
                    Delete
                  </button>
                </div>
              </Fragment>
            );
          })}
      </div>

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

import React from "react";
import { Link, useLocation, useParams } from "react-router";
import useFetch from "../hooks/UseFetch";
import { useState } from "react";
import { Fragment } from "react";

async function handleAdd(title, userid, coverPhoto, resetData) {
  if (title === "") return;
  await fetch("http://localhost:3000/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userid: userid,
      title: title,
      coverPhoto: coverPhoto,
    }),
  });

  resetData();
}

async function handleDelete(resetData, albumid) {
  await fetch(`http://localhost:3000/albums/${albumid}`, { method: "DELETE" });
  resetData();
}

function UserAlbums() {
  const { userid } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const [albumInput, setAlbumInput] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const fetch = useFetch(`http://localhost:3000/albums?userid=${userid}`);
  const albumsArray = fetch.data;

  return (
    <>
      <div className="userAlbums">
        {!fetch.loading &&
          albumsArray.map((album, index) => {
            return (
              <Fragment key={index}>
                <Link to={`${currentPath}/${albumsArray[index].id}/page/1`}>
                  {album.title}
                </Link>
                <img
                  src={album.coverPhoto}
                  style={{ maxHeight: 150, maxWidth: 150 }}
                />
                <button
                  onClick={() => {
                    handleDelete(fetch.resetData, album.id);
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
              value={albumInput}
              onChange={(e) => setAlbumInput(e.target.value)}
            />
            <br />
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
            <br />
            <button
              onClick={() => {
                handleAdd(albumInput, userid, coverImage, fetch.resetData);
                setAlbumInput("");
                setCoverImage("");
              }}
            >
              Add Album
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default UserAlbums;

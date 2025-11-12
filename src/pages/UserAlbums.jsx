import React from "react";
import { Link, useLocation, useParams } from "react-router";
import useFetch from "../hooks/UseFetch";
import { useState } from "react";
import { Fragment } from "react";

async function handleAdd(title, userid, resetData) {
  if (title === "") return;
  await fetch("http://localhost:3000/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userid: userid, title: title, coverPhoto: "" }),
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

  const fetch = useFetch(`http://localhost:3000/albums?userid=${userid}`);
  const albumsArray = fetch.data;
  console.log("fetch.data: ", fetch.data);

  return (
    <>
      {!fetch.loading &&
        albumsArray.map((album, index) => {
          return (
            <Fragment key={index}>
              <Link to={`${currentPath}/${albumsArray[index].id}/page/1`}>
                {album.title}
              </Link>
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
          <button
            onClick={() => {
              handleAdd(albumInput, userid, fetch.resetData);
              setAlbumInput("");
            }}
          >
            Add Album
          </button>
        </>
      )}
    </>
  );
}

export default UserAlbums;

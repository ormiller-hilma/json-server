import React from "react";
import { Link, useLocation, useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function UserAlbums() {
  const { userid } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  // const path = ["photos"];
  const fetch = useFetch(`http://localhost:3000/albums?id=${userid}`);
  const albumsArray = fetch.data;
  console.log(albumsArray);

  return (
    <>
      {!fetch.loading &&
        albumsArray.map((album, index) => {
          return (
            <Link key={index} to={`${currentPath}/${index}`}>
              {album.title}
            </Link>
          ); // TODO: add proper key
        })}
    </>
  );
}

export default UserAlbums;

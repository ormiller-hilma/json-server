import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function AlbumsDisplay() {
  const { userid } = useParams();

  const data = useFetch(`http://localhost:3000/users`, [userid, "albums"]);
  const albumsArray = data.data;
  console.log(albumsArray);

  return (
    <>
      <h1>{userid}</h1>
      {!data.loading &&
        albumsArray.map((album, index) => {
          return <h2 key={index}>{album}</h2>; // TODO: give proper key
        })}
    </>
  );
}

export default AlbumsDisplay;

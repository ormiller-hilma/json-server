import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function AlbumsDisplay() {
  const { userid, albumid } = useParams();

  const path = [userid, "albums", albumid];
  const fetch = useFetch(`http://localhost:3000/users`, path);
  const albumArray = fetch.data;

  //   console.log(albumsArray);

  return (
    <>
      <h1>{userid}</h1>

      {fetch.loading && <h2>Loading...</h2>}

      {!fetch.loading &&
        albumArray.map((album, index) => {
          return <h2 key={index}>{album}</h2>; // TODO: give proper key
        })}
    </>
  );
}

export default AlbumsDisplay;

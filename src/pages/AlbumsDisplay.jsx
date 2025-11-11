import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function AlbumsDisplay() {
  const { userid, albumid } = useParams();

  const path = [userid, "albums", albumid];
  const fetch = useFetch(`http://localhost:3000/users`, path);
  const albumArray = fetch.data.album;

  console.log(albumArray);

  return (
    <>
      <h1>{userid}</h1>

      {fetch.loading && <h2>Loading...</h2>}

      {!fetch.loading &&
        albumArray.map((imageSrc, index) => {
          // TODO: give proper key
          return <img key={index} src={imageSrc} alt="" />;
        })}
    </>
  );
}

export default AlbumsDisplay;

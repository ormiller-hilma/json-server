import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function AlbumsDisplay() {
  const { userid, albumid } = useParams();

  const fetch = useFetch(`http://localhost:3000/photos?albumid=${albumid}`);
  const photoArray = fetch.data;

  console.log(photoArray);

  return (
    <>
      <h1>{fetch.data.name}</h1>

      {fetch.loading && <h2>Loading...</h2>}

      {!fetch.loading &&
        photoArray.map((photo, index) => {
          // TODO: give proper key
          return <img key={index} src={photo.url} alt="" />;
        })}
    </>
  );
}

export default AlbumsDisplay;

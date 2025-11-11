import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function AlbumsDisplay() {
  const { albumid } = useParams();

  const fetch = useFetch(
    `http://localhost:3000/photos?albumid=${albumid}&_start=1&_limit=4`
  );
  const photoArray = fetch.data;

  console.log(photoArray);

  return (
    <>
      <h1>{fetch.data.name}</h1>

      {fetch.loading && <h2>Loading...</h2>}

      {!fetch.loading &&
        photoArray.map((photo, index) => {
          // TODO: give proper key
          return (
            <img
              key={index}
              src={photo.url}
              alt=""
              style={{ maxWidth: 250, maxHeight: 250 }}
            />
          );
        })}
    </>
  );
}

export default AlbumsDisplay;

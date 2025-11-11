import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";
import { useState } from "react";
import { Fragment } from "react";

function AlbumsDisplay() {
  const { albumid } = useParams();
  const [page, setPage] = useState(0);
  const limit = 4;

  const start = limit * page;

  const fetch = useFetch(
    `http://localhost:3000/photos?albumid=${albumid}&_start=${start}&_limit=${limit}`
  );

  const photoArray = fetch.data;

  return (
    <>
      <h1>{fetch.data.name}</h1>

      {fetch.loading && <h2>Loading...</h2>}

      {!fetch.loading && page > 0 && (
        <button
          onClick={() => {
            setPage((prev) => prev - 1);
            fetch.resetData();
          }}
        >
          Prev
        </button>
      )}

      {!fetch.loading &&
        photoArray.map((photo, index) => {
          return (
            <Fragment key={`${index} ${page}`}>
              <img
                src={photo.url}
                alt="f"
                style={{ maxWidth: 250, maxHeight: 250 }}
              />
            </Fragment>
          );
        })}

      {!fetch.loading && (
        <button
          onClick={() => {
            setPage((prev) => prev + 1);
            fetch.resetData();
          }}
        >
          Next
        </button>
      )}
    </>
  );
}

export default AlbumsDisplay;

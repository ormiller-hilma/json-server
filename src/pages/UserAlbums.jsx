import React from "react";
import { Link, useLocation, useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function UserAlbums() {
  const { userid } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const path = [userid, "albums"];
  const fetch = useFetch(`http://localhost:3000/users`, path);
  const albumsArray = fetch.data;

  return (
    <>
      {!fetch.loading &&
        albumsArray.map((key, index) => {
          return (
            <Link key={index} to={`${currentPath}/${index}`}>
              {index}
            </Link>
          ); // TODO: add proper key
        })}
    </>
  );
}

export default UserAlbums;

import React from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/UseFetch";

function AlbumsDisplay() {
  const { userid } = useParams();

  const data = useFetch("http://localhost:3000/users");
  console.log(data);

  return (
    <>
      <h1>{userid}</h1>
      <h1>{data}</h1>
    </>
  );
}

export default AlbumsDisplay;

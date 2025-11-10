import React from "react";
import { useParams } from "react-router";

function AlbumsDisplay() {
  const { userid } = useParams();

  return <>
  <h1>{userid</h1></>;
}

export default AlbumsDisplay;

import React from "react";
import { NavLink, useSearchParams, useNavigate } from "react-router";

function Home() {
  //   const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //   console.log(searchParams.get(""));
  //   setSearchParams;
  return (
    <>
      <h1>HOME</h1>
      <button onClick={() => navigate("home")}></button>
    </>
  );
}

export default Home;

import React from "react";
import { NavLink } from "react-router";
import HomeNavbar from "../components/HomeNavbar";
import { Outlet } from "react-router";

function Home() {
  return (
    <>
      <h1>HOME</h1>
      <div>{/* <HomeNavbar /> */}</div>
      {/* <Outlet /> */}
    </>
  );
}

export default Home;

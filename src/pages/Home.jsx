import React from "react";
import { NavLink } from "react-router";
import HomeNavbar from "../components/HomeNavbar";
import { Outlet } from "react-router";

function Home() {
  return (
    <>
      <HomeNavbar />
      <Outlet />
    </>
  );
}

export default Home;

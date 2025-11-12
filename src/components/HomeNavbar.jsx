import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import { UserContext } from "../contexts/UserContx";
import LogoutButton from "./LogoutBtn";
import "../styles/Navbar.css";

function HomeNavbar() {
  const { user } = useContext(UserContext);

  const userid = user.id || "default-user-id";

  return (
    <>
      <nav className="NavBar">
        <NavLink to="/home">Home</NavLink>
        <NavLink to={`users/${userid}/albums`}>Albums</NavLink>
        <NavLink to="/home/todo">Todos</NavLink>
        <NavLink to={`users/${userid}/posts`}>Posts</NavLink>
        <NavLink to={`users/${userid}/info`}>{user.username}'s Info</NavLink>
        <LogoutButton />
        <br />
      </nav>
    </>
  );
}
export default HomeNavbar;

import React, { useContext } from "react";
import { NavLink, useParams } from "react-router";
import { UserContext } from "../contexts/UserContx";
import LogoutButton from "./LogoutBtn";

function HomeNavbar() {
  const { user } = useContext(UserContext);
  const { albumid } = useParams();

  const userid = user.id || "default-user-id";

  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to={`users/${userid}/albums`}>Albums</NavLink>
      <NavLink to="home/todo">Todos</NavLink>
      <NavLink to={`users/${userid}/posts`}>Posts</NavLink>
      <LogoutButton />
      {/* {user && (
        <div>
          <NavLink to={`/home/users/${user.user}/albums`}>My Albums</NavLink>
          <NavLink to={`/home/users/${user.user}/todos`}>My ToDo</NavLink>
          {albumid && <span>Album {albumid}</span>}{" "}
        </div>
      )} */}
    </nav>
  );
}
export default HomeNavbar;

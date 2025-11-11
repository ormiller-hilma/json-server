import React, { useContext } from "react";
import { NavLink, useParams } from "react-router";
import { UserContext } from "../contexts/UserContx";

function HomeNavbar() {
  const { user } = useContext(UserContext);
  const { albumid } = useParams();
  return (
    <nav>
      <div>
        <NavLink to="/home">Home</NavLink>
        {user && (
          <div>
            <NavLink to={`/home/users/${user.user}/albums`}>My Albums</NavLink>
            <NavLink to={`/home/users/${user.user}/todos`}>My ToDo</NavLink>
            {albumid && <span>Album {albumid}</span>}{" "}
          </div>
        )}
      </div>
    </nav>
  );
}
export default HomeNavbar;

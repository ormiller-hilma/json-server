import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContx";

function UserInfo() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="userInfo">
        <h2>Username:</h2>
        <p>{user.username}</p>
        <h2>ID:</h2>
        <p>{user.id}</p>
      </div>
    </>
  );
}

export default UserInfo;

import React from "react";
import { useNavigate } from "react-router";

function LogoutButton() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("username");
    console.log("User logged out");
    navigate("login");
  }

  return <button onClick={handleLogout}>Log Out</button>;
}

export default LogoutButton;

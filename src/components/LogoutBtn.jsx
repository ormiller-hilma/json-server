import React from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../contexts/UserContx";
import { useContext } from "react";
function LogoutButton() {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  function handleLogout() {
    console.log("User logged out");
    user.setUser("");
    navigate("/login", { replace: true });
  }

  return (
    <button className="logoutBtn" onClick={handleLogout}>
      Log Out
    </button>
  );
}

export default LogoutButton;

import React from "react";
import { UserContext } from "../contexts/UserContx";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/users?username=${username}&password=${password}`
      );

      if (!response.ok) {
        throw new Error("Error during login proccesing");
      }

      const data = await response.json();
      if (data[0] === undefined)
        throw new Error("Error during login proccesing");
      console.log("Login successful:", data);
      user.setUser({ id: data.id, username: username });
      setSuccess(true);
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>

        {error && <p>{error}</p>}
        {success && <p>Login successful!</p>}
      </form>
    </div>
  );
}

export default Login;

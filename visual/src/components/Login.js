// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); 
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          country: 'Colombia',
          password: username,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      // Save user ID in local storage
      localStorage.setItem("userId", data.id);

      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
      // Display an error message to the user
    }
  };

  return (
    <div className="login-container">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Lastfm_logo.svg/2560px-Lastfm_logo.svg.png"
        alt="Last.fm Logo"
        className="logo"
      />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="user"
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
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="login-link">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;

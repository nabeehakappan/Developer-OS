import { useState } from "react";
import { login, signup } from "../services/auth";
import "../styles/login.css"
export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-screen">
  <div className="login-box">
    <h1>DevOS</h1>

    <input
      placeholder="Username"
      onChange={(e) => setUsername(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <button
  onClick={async () => {
    try {
      await login({ username, password });
      onLogin(); // only after success
    } catch (err) {
      alert("Login failed");
    }
  }}>
  Login
</button>

   

  <button
  className="secondary"
  onClick={async () => {
    try {
      await signup({ username, password });
      alert("Account created! Now login.");
    } catch {
      alert("Signup failed");
    }
  }}
>
  Signup
</button>
  </div>
</div>
  );
}
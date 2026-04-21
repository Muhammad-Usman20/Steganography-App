import { useState } from "react";
// import "./Login.css";

export default function Login({ setAuthPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please signup.");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      window.location.reload();
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card"></div>
      <div className="card">
        <h2>Login</h2>

        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have account?{" "}
          <span onClick={() => setAuthPage("signup")} style={{ color: "blue", cursor: "pointer" }}>
            Signup
          </span>
        </p>
      </div>
    </div>

  );
}


import firebase from "firebase/compat/app"


// New with firebase
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setAuthPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 FIREBASE LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");

      // ✅ Save login state (optional but useful)
      localStorage.setItem("isLoggedIn", "true");

      // Refresh app to enter main screen
      window.location.reload();

    } catch (error) {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="auth-container">
      <div className="card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have account?{" "}
          <span
            onClick={() => setAuthPage("signup")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}
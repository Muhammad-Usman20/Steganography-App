
import React, { useState } from "react";
import Encode from "./components/Encode";
import Decode from "./components/Decode";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { useEffect } from "react";


function App() {
  const [tab, setTab] = useState("encode");
  const [authPage, setAuthPage] = useState("login");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // 🔐 NOT LOGGED IN
  if (!isLoggedIn) {
    return (
      <div className="app">
        <h1>⭐ PixelCipher</h1>

        {authPage === "login" ? (
          <Login setAuthPage={setAuthPage} />
        ) : (
          <Signup setAuthPage={setAuthPage} />
        )}
      </div>
    );
  }

  // ✅ LOGGED IN → SHOW APP
  return (
    <div className="app">
      <h1>⭐ PixelCipher</h1>

      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          window.location.reload();
        }}
      >
        Logout
      </button>

      <Navbar setTab={setTab} />

      {tab === "encode" ? <Encode /> : <Decode />}
    </div >
  );
}

export default App;


import React, { useState } from "react";
import Encode from "./components/Encode";
import Decode from "./components/Decode";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [tab, setTab] = useState("encode");

  return (
    <div className="app pixel-bg">
      <h1>⭐ PixelCipher</h1>
      <h3 className="tagline">Hide Secrets Inside Every Pixel</h3>
      <Navbar setTab={setTab} />

      {tab === "encode" ? <Encode /> : <Decode />}
    </div>
  );
}

export default App;



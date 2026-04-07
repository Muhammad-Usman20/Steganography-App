import React, { useState } from "react";
import Encode from "./components/Encode";
import Decode from "./components/Decode";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [tab, setTab] = useState("encode");

  return (
    <div className="app">
      <h1>Steganography App</h1>
      <Navbar setTab={setTab} />

      {tab === "encode" ? <Encode /> : <Decode />}
    </div>
  );
}

export default App;
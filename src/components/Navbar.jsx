import React from "react";

export default function Navbar({ setTab }) {
    return (
        <div className="navbar">
            <button onClick={() => setTab("encode")}>Encode</button>
            <button onClick={() => setTab("decode")}>Decode</button>
        </div>
    );
}
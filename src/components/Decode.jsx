import React, { useRef, useState } from "react";
import { decodeMessage } from "../utils/stego";

export default function Decode() {
    const canvasRef = useRef();
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [decodedText, setDecodedText] = useState(""); // store raw decoded text

    const handleImage = (e) => {
        const file = e.target.files[0];
        const img = new Image();

        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // let decoded = decodeMessage(imageData);
            // setMessage(decoded);


            let decoded = decodeMessage(imageData);
            setDecodedText(decoded); // store hidden raw data
        };

        img.src = URL.createObjectURL(file);
    };



    const handleDecode = () => {
        if (!decodedText) {
            alert("Upload image first!");
            return;
        }

        const parts = decodedText.split("|");

        if (parts.length < 2) {
            alert("No hidden message found!");
            return;
        }

        const storedPassword = parts[0];
        const hiddenMessage = parts[1].replace("###END###", "");

        if (password !== storedPassword) {
            alert("Incorrect password!");
            return;
        }

        setMessage(hiddenMessage);
    };

    // return (
    //     <div className="card">
    //         <h2>Decode Message</h2>

    //         {/* <input type="file" onChange={handleImage} /> */}

    //         <div className="file-input-wrapper">
    //             <label className="file-input-label">
    //                 Upload Image
    //                 <input type="file" onChange={handleImage} />
    //             </label>
    //         </div>

    //         <p><b>Hidden Message:</b></p>
    //         {/* <textarea value={message} readOnly /> */}
    //         <textarea value={message} readOnly placeholder="Decoded message will appear here" />

    //         <canvas ref={canvasRef}></canvas>
    //     </div>
    // );

    return (
        <div className="card">
            <h2>Decode Message</h2>

            <div className="file-input-wrapper">
                <label className="file-input-label">
                    Upload Image
                    <input type="file" onChange={handleImage} />
                </label>
            </div>

            {/* 🔐 PASSWORD INPUT */}
            <input
                type="password"
                placeholder="Enter password to decode"
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* 🔘 BUTTON */}
            <button onClick={handleDecode}>Decode</button>

            <p><b>Hidden Message:</b></p>
            <textarea value={message} readOnly />

            <canvas ref={canvasRef}></canvas>



            {/* <button onClick={() => {
                localStorage.removeItem("isLoggedIn");
                window.location.href = "/login";
            }}>
                Logout
            </button> */}


        </div>
    );
}
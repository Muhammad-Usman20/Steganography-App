import React, { useRef, useState } from "react";
import { decodeMessage } from "../utils/stego";

export default function Decode() {
    const canvasRef = useRef();
    const [message, setMessage] = useState("");

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
            let decoded = decodeMessage(imageData);

            setMessage(decoded);
        };

        img.src = URL.createObjectURL(file);
    };

    return (
        <div className="card">
            <h2>Decode Message</h2>

            {/* <input type="file" onChange={handleImage} /> */}

            <div className="file-input-wrapper">
                <label className="file-input-label">
                    Upload Image
                    <input type="file" onChange={handleImage} />
                </label>
            </div>

            <p><b>Hidden Message:</b></p>
            <textarea value={message} readOnly />

            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
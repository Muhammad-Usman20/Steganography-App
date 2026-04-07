import React, { useRef, useState } from "react";
import { encodeMessage } from "../utils/stego";

export default function Encode() {
    const canvasRef = useRef();
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    // Add this along with your other useState
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImage = (e) => {
        const file = e.target.files[0];
        const img = new Image();

        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            setImageLoaded(true); // ✅ mark image as loaded
        };

        img.src = URL.createObjectURL(file);
        setImage(img);
    };

    const handleEncode = () => {
        if (!imageLoaded) {
            alert("Upload an image first!");
            return;
        }

        if (!message) {
            alert("Enter a message!");
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let newData = encodeMessage(imageData, message);

        ctx.putImageData(newData, 0, 0);
        alert("Message encoded!");
    };

    const downloadImage = () => {
        if (!imageLoaded) {
            alert("Please upload an image first!");
            return;
        }

        const canvas = canvasRef.current;
        const link = document.createElement("a");

        link.download = "encoded.png";
        link.href = canvas.toDataURL();
        link.click();
    };

    return (
        <div className="card">
            <h2>Encode Message</h2>

            {/* <input type="file" onChange={handleImage} /> */}

            <div className="file-input-wrapper">
                <label className="file-input-label">
                    Upload Image
                    <input type="file" onChange={handleImage} />
                </label>
            </div>
            <textarea
                placeholder="Enter secret message"
                onChange={(e) => setMessage(e.target.value)}
            />

            {/* <button onClick={handleEncode}>Encode</button>
            <button onClick={downloadImage}>Download</button> */}


            <button onClick={handleEncode} disabled={!imageLoaded}>Encode</button>
            <button onClick={downloadImage} disabled={!imageLoaded}>Download</button>

            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
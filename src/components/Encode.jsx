import React, { useRef, useState } from "react";
import { encodeMessage } from "../utils/stego";
import emailjs from "@emailjs/browser";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Encode() {
    const canvasRef = useRef();


    const originalCanvasRef = useRef(null);
    const encodedCanvasRef = useRef(null);



    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    // Add this along with your other useState
    const [imageLoaded, setImageLoaded] = useState(false);
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEncoded, setIsEncoded] = useState(false);


    // New Handle Image
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            // ORIGINAL CANVAS
            const originalCanvas = originalCanvasRef.current;
            const ctx1 = originalCanvas.getContext("2d");

            originalCanvas.width = img.width;
            originalCanvas.height = img.height;
            ctx1.drawImage(img, 0, 0);

            // ALSO DRAW SAME IMAGE IN ENCODED CANVAS
            const encodedCanvas = encodedCanvasRef.current;
            const ctx2 = encodedCanvas.getContext("2d");

            encodedCanvas.width = img.width;
            encodedCanvas.height = img.height;
            ctx2.drawImage(img, 0, 0);

            setImageLoaded(true);
        };
    };


    // New Handle Encode
    const handleEncode = async () => {
        if (!imageLoaded) {
            alert("Upload an image first!");
            return;
        }

        if (!message) {
            alert("Please enter a message!");
            return;
        }

        // Password Required
        if (!password) {
            alert("Please enter a password before encoding!");
            return;
        }

        const canvas = encodedCanvasRef.current;
        const ctx = canvas.getContext("2d");

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // let newData = encodeMessage(imageData, message);

        let fullMessage = password + "|" + message + "###END###";

        let newData = encodeMessage(imageData, fullMessage);

        ctx.putImageData(newData, 0, 0);

        // 🔥 Compare pixels
        comparePixels(originalCanvasRef.current, encodedCanvasRef.current);

        alert("Message encoded! Check console for pixel differences.");


        // for whatsapp button disable
        setIsEncoded(true);


        // with firebase
        const user = auth.currentUser;

        if (user) {
            try {
                await addDoc(collection(db, "encodedImages"), {
                    userId: user.uid,
                    email: user.email,
                    message: message,
                    createdAt: new Date().toISOString()
                });

                console.log("Data saved in Firebase");
            } catch (err) {
                console.error("Error saving data:", err);
            }
        }


    };

    // Whatsapp Share feature
    const shareOnWhatsApp = () => {
        const message =
            "This image contains a hidden secret message encoded using steganography. Please attach the downloaded encoded image manually and send it via WhatsApp.";

        const whatsappURL =
            `https://wa.me/?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank");
    };



    const downloadImage = () => {
        if (!imageLoaded) {
            alert("Please upload an image first!");
            return;
        }

        const canvas = encodedCanvasRef.current;
        const link = document.createElement("a");

        link.download = "encoded.png";
        link.href = canvas.toDataURL();
        // PNG = lossless → large size
        // JPG = compressed → small size
        link.click();
    };

    // Extra Work for Practice

    function comparePixels(originalCanvas, encodedCanvas) {
        const ctx1 = originalCanvas.getContext("2d");
        const ctx2 = encodedCanvas.getContext("2d");

        const data1 = ctx1.getImageData(0, 0, originalCanvas.width, originalCanvas.height).data;
        const data2 = ctx2.getImageData(0, 0, encodedCanvas.width, encodedCanvas.height).data;

        let differences = [];

        for (let i = 0; i < 50; i++) {
            if (data1[i] !== data2[i]) {
                differences.push({
                    index: i,
                    original: data1[i],
                    encoded: data2[i]
                });
            }
        }

        console.log("Pixel Differences:", differences);
    }

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

            <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleEncode} disabled={!imageLoaded}>Encode</button>



            <button
                onClick={shareOnWhatsApp}
                disabled={
                    !imageLoaded ||
                    !message ||
                    !password ||
                    !isEncoded
                }
            >
                {isEncoded
                    ? "Share on WhatsApp"
                    : "Encode First "}
            </button>



            <button onClick={downloadImage} disabled={!imageLoaded}>Download</button>

            {/* <canvas ref={canvasRef}></canvas> */}

            <p>Original Image</p>
            <canvas ref={originalCanvasRef}></canvas>

            <p>Encoded Image</p>
            <canvas ref={encodedCanvasRef}></canvas>



            {/* <button onClick={() => {
                localStorage.removeItem("isLoggedIn");
                window.location.href = "/login";
            }}>
                Logout
            </button> */}
        </div>

    );
}
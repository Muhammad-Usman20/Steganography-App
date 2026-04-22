// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgKcn6gp74eGUu7SNYe9wgBV5eV7wQmxw",
    authDomain: "steganography-app-6e6df.firebaseapp.com",
    projectId: "steganography-app-6e6df",
    storageBucket: "steganography-app-6e6df.firebasestorage.app",
    messagingSenderId: "157162518002",
    appId: "1:157162518002:web:696fc27b841330166e676b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
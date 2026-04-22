// import { useState } from "react";
// import { auth, db } from "../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";
// // import "./Signup.css";

// export default function Signup({ setAuthPage }) {
//     const [user, setUser] = useState({
//         firstName: "",
//         lastName: "",
//         age: "",
//         gender: "",
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const handleSignup = () => {
//         if (!user.firstName || !user.email || !user.password) {
//             alert("Please fill required fields!");
//             return;
//         }

//         localStorage.setItem("user", JSON.stringify(user));
//         alert("Signup successful!");

//         setAuthPage("login");
//     };

//     return (

//         <div className="auth-container">
//             <div className="auth-card"></div>


//             <div className="card">
//                 <h2>Signup</h2>

//                 <input name="firstName" placeholder="First Name" onChange={handleChange} />
//                 <input name="lastName" placeholder="Last Name" onChange={handleChange} />
//                 <input name="age" type="number" placeholder="Age" onChange={handleChange} />

//                 <select name="gender" onChange={handleChange}>
//                     <option value="">Select Gender</option>
//                     <option>Male</option>
//                     <option>Female</option>
//                 </select>



//                 <input name="email" type="email" placeholder="Email" onChange={handleChange} />
//                 <input name="password" type="password" placeholder="Password" onChange={handleChange} />

//                 <button onClick={handleSignup}>Signup</button>

//                 <p>
//                     Already have account?{" "}
//                     <span onClick={() => setAuthPage("login")} style={{ color: "blue", cursor: "pointer" }}>
//                         Login
//                     </span>
//                 </p>
//             </div>

//         </div>

//     );
// }


















// New with firebase

import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Signup({ setAuthPage }) {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // 🔥 UPDATED FIREBASE SIGNUP
    const handleSignup = async () => {
        if (!user.firstName || !user.email || !user.password) {
            alert("Please fill required fields!");
            return;
        }

        try {
            const userCred = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

            const firebaseUser = userCred.user;

            // ✅ Save extra data in Firestore
            await setDoc(doc(db, "users", firebaseUser.uid), {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                gender: user.gender,
                email: user.email,
                createdAt: new Date().toISOString()
            });

            alert("Signup successful!");
            setAuthPage("login");

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Signup</h2>

                <input
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                />

                <input
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                />

                <input
                    name="age"
                    type="number"
                    placeholder="Age"
                    onChange={handleChange}
                />

                <select name="gender" onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button onClick={handleSignup}>Signup</button>

                <p>
                    Already have account?{" "}
                    <span
                        onClick={() => setAuthPage("login")}
                        style={{ color: "blue", cursor: "pointer" }}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
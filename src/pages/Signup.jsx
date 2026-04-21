import { useState } from "react";
// import "./Signup.css";

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

    const handleSignup = () => {
        if (!user.firstName || !user.email || !user.password) {
            alert("Please fill required fields!");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        alert("Signup successful!");

        setAuthPage("login");
    };

    return (

        <div className="auth-container">
            <div className="auth-card"></div>


            <div className="card">
                <h2>Signup</h2>

                <input name="firstName" placeholder="First Name" onChange={handleChange} />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} />
                <input name="age" type="number" placeholder="Age" onChange={handleChange} />

                {/* <select name="gender" onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select> */}


                {/* Gnder */}
                <div className="gender-buttons">
                    <button type="button" onClick={() => handleChange({ target: { name: "gender", value: "Male" } })}>
                        Male
                    </button>

                    <button type="button" onClick={() => handleChange({ target: { name: "gender", value: "Female" } })}>
                        Female
                    </button>
                </div>








                <input name="email" type="email" placeholder="Email" onChange={handleChange} />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} />

                <button onClick={handleSignup}>Signup</button>

                <p>
                    Already have account?{" "}
                    <span onClick={() => setAuthPage("login")} style={{ color: "blue", cursor: "pointer" }}>
                        Login
                    </span>
                </p>
            </div>

        </div>

    );
}
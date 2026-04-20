import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();

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
        if (!user.firstName || !user.lastName || !user.email || !user.password) {
            alert("Please fill all required fields!");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        alert("Signup successful!");
        navigate("/login");
    };

    return (
        <div className="card">
            <h2>Signup</h2>

            <input name="firstName" placeholder="First Name" onChange={handleChange} />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} />
            <input name="age" type="number" placeholder="Age" onChange={handleChange} />

            <select name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
            </select>

            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />

            <button onClick={handleSignup}>Signup</button>
        </div>
    );
}
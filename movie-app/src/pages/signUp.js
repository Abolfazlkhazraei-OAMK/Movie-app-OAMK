import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../context/useUser";

export default function SignUp() {
    const { user, setUser, signUp } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp();
            navigate("/signin");
        } catch (error) {
            const message = error.response && error.response.data ? error.response.data.error : error;
            alert(message);
        }
    };

    const handleHomeRedirect = () => {
        navigate("/");
    };

    return (
        <div>
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={user.firstname || ""}
                        onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={user.lastname || ""}
                        onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={user.email || ""}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={user.password || ""}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <div>
                    <button>Sign Up</button>
                </div>
                <div>
                    <Link to="/signin">Already signed up? Sign in</Link>
                </div>
            </form>
            <div>
                <button onClick={handleHomeRedirect}>Go to Home</button>
            </div>
        </div>
    );
}

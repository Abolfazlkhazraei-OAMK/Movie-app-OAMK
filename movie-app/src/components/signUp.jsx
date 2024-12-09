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
        <div className="form-container">
            <div className="form-main">
                <h3 className="heading">Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <label>First Name</label>
                        <input
                            className="inputField"
                            type="text"
                            value={user.firstname || ""}
                            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
                        />
                    </div>
                    <div className="inputContainer">
                        <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16"></svg>
                        <label>Last Name</label>
                        <input
                            className="inputField"
                            type="text"
                            value={user.lastname || ""}
                            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
                            />
                    </div>
                    <div className="inputContainer">                    
                        <label>Email</label>
                        <input
                            className="inputField"
                            type="email"
                            value={user.email || ""}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                    </div>
                    <div className="inputContainer">
                        <label>Password</label>
                        <input
                            className="inputField"
                            type="password"
                            value={user.password || ""}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <button id="button">Sign Up</button>
                    </div>
                    <div className="signupContainer">
                        <p>Already have an account?</p>
                        <Link to="/signin">Sign in</Link>
                    </div>
                </form>
                <div className="homeContainer">
                    <button onClick={handleHomeRedirect}>Go to Home</button>
                </div>
            </div>
        </div>
    );
}

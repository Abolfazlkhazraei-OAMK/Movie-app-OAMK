import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../context/useUser";
import './form.css';

export default function SignIn() {
    const { user, setUser, signIn } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn();
            navigate("/");
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
            <div className="form-main justify-content-center align-items-center">
                <h3>Sign In</h3>
                <form onSubmit={handleSubmit}>
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
                        <button id="button">Sign In</button>
                    </div>
                    <div className="signupContainer">
                        <p>Don't have an account?</p>
                        <Link to="/signup">Sign up</Link>
                    </div>
                </form>
                <div className="homeContainer">
                    <button onClick={handleHomeRedirect}>Go to Home</button>
                </div>
            </div>
        </div>
    );
}

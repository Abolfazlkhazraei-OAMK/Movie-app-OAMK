import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../context/useUser";

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
        <div>
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit}>
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
                    <button>Sign In</button>
                </div>
                <div>
                    <Link to="/signup">No account? Sign up</Link>
                </div>
            </form>
            <div>
                <button onClick={handleHomeRedirect}>Go to Home</button>
            </div>
        </div>
    );
}

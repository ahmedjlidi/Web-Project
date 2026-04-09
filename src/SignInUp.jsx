import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInUp.css';

function SignInUpForm() {
    const [isLogin, setSignIn] = useState(true);
    const navigate = useNavigate();

    function toggleSignUp() {
        setSignIn(!isLogin);
    }

    const handleAuth = (e) => {
        e.preventDefault();
        navigate('/dashboard'); 
    };

    return (
        <div className="page">
            <form className="form" onSubmit={handleAuth}> 
                <div className="logo">StudyBuddy</div>

                {isLogin ? <h2>Log In</h2> : <h2>Sign Up</h2>}
                <p className="subtitle">
                    {isLogin ? "Log into your account" : "Create your account"}
                </p>

                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id="email" required />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" required />

                {isLogin && (
                    <div className="extra-link">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                )}

                <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>

                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={toggleSignUp} style={{ cursor: "pointer", color: "#4c7dff", fontWeight: 'bold' }}>
                        {isLogin ? " Sign up" : " Log in"}
                    </span>
                </p>

                <div className="footer-links">
                    <a href="/terms">Terms</a>
                    <span>·</span>
                    <a href="/privacy">Privacy</a>
                </div>
            </form>
        </div>
    );
}

export default SignInUpForm;
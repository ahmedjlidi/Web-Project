import { useState } from 'react'
import './SignInUp.css'


function SignInUpForm() {


    const [isLogin, setSignIn] = useState(true);

    function toggleSignUp() {
        setSignIn(!isLogin);
    }

    return (
        <div className="page">
            <form className="form" action="/login-process" method="POST">
                <div className="logo">StudyBuddy</div>

                {isLogin ? <h2>Log In</h2> : <h2>Sign Up</h2>}
                <p className="subtitle">Log into your account</p>

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    required
                />

                <div className="extra-link">
                    <a href="/forgot-password">Forgot password?</a>
                </div>

                <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>

                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={toggleSignUp} style={{ cursor: "pointer", color: "blue" }}>
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
    )
}

export default SignInUpForm
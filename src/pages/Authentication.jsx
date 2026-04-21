import { useEffect, useState } from 'react'
import './Authentication.css'

function Authentication({ state }) {
    const [isLogin, setSignIn] = useState(true)
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [success, setSuccess] = useState(false)

    function toggleSignUp() {
        setSignIn(!isLogin)
        setSuccess(false)
        setUser('')
        setPwd('')
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    useEffect(() => {
        if (state !== "login") toggleSignUp()
    }, [])

    return (
        <div className="page">
            <form className="form" onSubmit={handleSubmit}>
                <div className="logo">StudyBuddy</div>

                {isLogin ? <h2>Log In</h2> : <h2>Sign Up</h2>}
                <p className="subtitle">
                    {isLogin ? "Log into your account" : "Create your account"}
                </p>

                {success && isLogin && (
                    <p className="success-message">Login successful</p>
                )}

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                />

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

                <div className="footer">
                    <a href="/terms">Terms</a>
                    <span>·</span>
                    <a href="/privacy">Privacy</a>
                </div>
            </form>
        </div>
    )
}

export default Authentication
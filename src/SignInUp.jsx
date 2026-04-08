import { useState } from 'react'
import './SignInUp.css'

function SignInUpForm() {
    const [isLogin, setSignIn] = useState(true)
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    function toggleSignUp() {
        setSignIn(!isLogin)
        setSuccess(false)
        setErrMsg('')
        setUser('')
        setPwd('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setErrMsg('')

            if (isLogin) {
                // later: call login API here
                // const response = await ...
                // const accessToken = response?.data?.accessToken
                // const roles = response?.data?.roles
                // setAuth({ user, pwd, roles, accessToken })

                setUser('')
                setPwd('')
                setSuccess(true)
            } else {
                // signup logic will be added later
                setSuccess(false)
            }
        } catch (err) {
            setErrMsg('Login failed')
            setSuccess(false)
        }
    }

    return (
        <div className="page">
            <form className="form" onSubmit={handleSubmit}>
                <div className="logo">StudyBuddy</div>

                <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
                <p className="subtitle">
                    {isLogin ? 'Log into your account' : 'Create your account'}
                </p>

                {errMsg && isLogin && (
                    <p className="error-message">{errMsg}</p>
                )}

                {success && isLogin && (
                    <p className="success-message">Login successful</p>
                )}

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                    autoComplete="off"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
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

                <button type="submit">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </button>

                <p>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <span
                        onClick={toggleSignUp}
                        style={{ cursor: 'pointer', color: 'blue' }}
                    >
                        {isLogin ? ' Sign up' : ' Log in'}
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
import { useEffect, useState } from 'react'
import './Authentication.css'
import Input from '../components/Input'
import { EMAIL_REGEX, PWD_REGEX } from '../components/validation'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

function Authentication({ state }) {
    const [currState, setCurrState] = useState(state)
    const [isLogin, setIsLogin] = useState(state === 'login')

    const [username, setUsername] = useState('')
    const [loginIdentifier, setLoginIdentifier] = useState('')
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')

    const [usernameValid, setUsernameValid] = useState(false)
    const [loginIdentifierValid, setLoginIdentifierValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [pwdValid, setPwdValid] = useState(false)

    const [usernameError, setUsernameError] = useState('')
    const [loginIdentifierError, setLoginIdentifierError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [pwdError, setPwdError] = useState('')

    const [usernameTouched, setUsernameTouched] = useState(false)
    const [loginIdentifierTouched, setLoginIdentifierTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [pwdTouched, setPwdTouched] = useState(false)

    const [submitted, setSubmitted] = useState(false)
    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const resetForm = (nextIsLogin) => {
        setIsLogin(nextIsLogin)

        setUsername('')
        setLoginIdentifier('')
        setEmail('')
        setPwd('')

        setUsernameValid(false)
        setLoginIdentifierValid(false)
        setEmailValid(false)
        setPwdValid(false)

        setUsernameError('')
        setLoginIdentifierError('')
        setEmailError('')
        setPwdError('')

        setUsernameTouched(false)
        setLoginIdentifierTouched(false)
        setEmailTouched(false)
        setPwdTouched(false)

        setSubmitted(false)
        setSuccess(false)
    }

    const toggleSignUp = () => {
        const nextIsLogin = !isLogin
        setCurrState(nextIsLogin ? 'login' : 'signup')
        resetForm(nextIsLogin)
    }

    const validateUsername = (value) => {
        const trimmed = value.trim()

        if (trimmed.length === 0) {
            return 'You cannot leave this field empty'
        }

        if (trimmed.length < 3) {
            return 'Username must be at least 3 characters.'
        }

        if (trimmed.length > 24) {
            return 'Username must be 24 characters or less.'
        }

        return ''
    }

    const validateLoginIdentifier = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }

        return ''
    }

    const validateSignupEmail = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }

        if (!EMAIL_REGEX.test(value)) {
            return 'Please enter a valid email address.'
        }

        return ''
    }

    const validateLoginPassword = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }

        return ''
    }

    const validateSignupPassword = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }

        if (!PWD_REGEX.test(value)) {
            return 'Password must be 8 to 24 characters and include uppercase, lowercase, number, and special character.'
        }

        return ''
    }

    const validatePassword = (value) => {
        return isLogin ? validateLoginPassword(value) : validateSignupPassword(value)
    }

    useEffect(() => {
        const usernameErr = validateUsername(username)
        setUsernameError(usernameErr)
        setUsernameValid(usernameErr === '')
    }, [username])

    useEffect(() => {
        const loginIdentifierErr = validateLoginIdentifier(loginIdentifier)
        setLoginIdentifierError(loginIdentifierErr)
        setLoginIdentifierValid(loginIdentifierErr === '')
    }, [loginIdentifier])

    useEffect(() => {
        const emailErr = validateSignupEmail(email)
        setEmailError(emailErr)
        setEmailValid(emailErr === '')
    }, [email])

    useEffect(() => {
        const pwdErr = validatePassword(pwd)
        setPwdError(pwdErr)
        setPwdValid(pwdErr === '')
    }, [pwd, isLogin])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess(false)
        setSubmitted(true)

        const pwdErr = validatePassword(pwd)

        setPwdError(pwdErr)
        setPwdValid(pwdErr === '')

        if (isLogin) {
            const loginIdentifierErr = validateLoginIdentifier(loginIdentifier)

            setLoginIdentifierError(loginIdentifierErr)
            setLoginIdentifierValid(loginIdentifierErr === '')

            if (loginIdentifierErr || pwdErr) return
        } else {
            const usernameErr = validateUsername(username)
            const emailErr = validateSignupEmail(email)

            setUsernameError(usernameErr)
            setEmailError(emailErr)

            setUsernameValid(usernameErr === '')
            setEmailValid(emailErr === '')

            if (usernameErr || emailErr || pwdErr) return
        }

        try {
            let response
            let data

            if (isLogin) {
                response = await fetch("http://localhost:3501/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        loginIdentifier,
                        password: pwd
                    })
                })
            } else {
                response = await fetch("http://localhost:3501/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username,
                        email,
                        password: pwd
                    })
                })
            }

            data = await response.json()
            console.log("Auth response:", data)
            console.log("Status:", response.status)

            if (!response.ok) {
                throw new Error(data.message || "Authentication failed")
            }

            setSuccess(true)

            if (isLogin) {
                if (!data.token) {
                    throw new Error("No token returned from server");
                }

                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));

                let test = sessionStorage.getItem("token");
                console.log(test);
                console.log(test)

                navigate("/dashboard");
            } else {
                resetForm(true)
                setCurrState("login")
            }

        } catch (err) {
            console.error(err)

            if (isLogin) {
                setLoginIdentifierError(err.message || "Login failed")
                setLoginIdentifierValid(false)
            } else {
                setEmailError(err.message || "Signup failed")
                setEmailValid(false)
            }

            setPwdError(err.message || "Operation failed. Please try again.")
            setPwdValid(false)
        }
    }

    return (
        <div className="page">
            <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="logo">
                    <img src={logo} alt="logo" className="logo-img" />
                    <span>StudyBuddy</span>
                </div>

                {isLogin ? <h2>Log In</h2> : <h2>Sign Up</h2>}

                <p className="subtitle">
                    {isLogin ? 'Log into your account' : 'Create your account'}
                </p>

                {success && (
                    <p className="success-message">
                        {isLogin ? 'Login successful' : 'Signup successful'}
                    </p>
                )}

                {isLogin ? (
                    <>
                        <label htmlFor="loginIdentifier">Username / Email</label>
                        <Input
                            id="loginIdentifier"
                            type="text"
                            input={loginIdentifier}
                            setInput={setLoginIdentifier}
                            placeholder="Enter username or email"
                            isValid={loginIdentifierValid}
                            errorMessage={loginIdentifierError}
                            showValidation={submitted || loginIdentifierTouched}
                            onFirstInteraction={() => setLoginIdentifierTouched(true)}
                        />
                    </>
                ) : (
                    <>
                        <label htmlFor="username">Username</label>
                        <Input
                            id="username"
                            type="text"
                            input={username}
                            setInput={setUsername}
                            placeholder="Enter username"
                            isValid={usernameValid}
                            errorMessage={usernameError}
                            showValidation={usernameTouched || submitted}
                            onFirstInteraction={() => setUsernameTouched(true)}
                        />

                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="text"
                            input={email}
                            setInput={setEmail}
                            placeholder="Enter email"
                            isValid={emailValid}
                            errorMessage={emailError}
                            showValidation={emailTouched || submitted}
                            onFirstInteraction={() => setEmailTouched(true)}
                        />
                    </>
                )}

                <label htmlFor="password">Password</label>
                <Input
                    id="password"
                    type="password"
                    input={pwd}
                    setInput={setPwd}
                    placeholder="Enter password"
                    isValid={pwdValid}
                    errorMessage={pwdError}
                    showValidation={isLogin ? submitted : (pwdTouched || submitted)}
                    onFirstInteraction={() => setPwdTouched(true)}
                />

                {isLogin && (
                    <div className="extra-link">
                        <a href="/forgot-password">Forgot password?</a>
                    </div>
                )}
                <button type="submit" className="auth-submit-button">
                    {isLogin ? 'Log In' : 'Sign Up'}
                </button>
                <p>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <span
                        onClick={toggleSignUp}
                        style={{ cursor: 'pointer', color: '#4c7dff', fontWeight: 'bold' }}
                    >
                        {isLogin ? ' Sign up' : ' Log in'}
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
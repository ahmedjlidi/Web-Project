import { useEffect, useState } from 'react'
import './Authentication.css'
import Input from '../components/Input'
import { EMAIL_REGEX, PWD_REGEX } from '../components/validation'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

function Authentication({ _state }) {
    const [currState, setCurrState] = useState(_state)
    const [isLogin, setIsLogin] = useState(_state === 'login')

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')

    const [emailValid, setEmailValid] = useState(false)
    const [pwdValid, setPwdValid] = useState(false)

    const [emailError, setEmailError] = useState('')
    const [pwdError, setPwdError] = useState('')

    const [emailTouched, setEmailTouched] = useState(false)
    const [pwdTouched, setPwdTouched] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [success, setSuccess] = useState(false)

    const navigate = useNavigate()

    const resetForm = (nextIsLogin) => {
        setIsLogin(nextIsLogin)
        setEmail('')
        setPwd('')

        setEmailValid(false)
        setPwdValid(false)

        setEmailError('')
        setPwdError('')

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

    const validateLoginEmail = (value) => {
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

    const validateSignupEmail = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }

        if (!EMAIL_REGEX.test(value)) {
            return 'Please enter a valid email address.'
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

    const validateEmail = (value) => {
        return isLogin ? validateLoginEmail(value) : validateSignupEmail(value)
    }

    const validatePassword = (value) => {
        return isLogin ? validateLoginPassword(value) : validateSignupPassword(value)
    }

    useEffect(() => {
        const emailErr = validateEmail(email)
        setEmailError(emailErr)
        setEmailValid(emailErr === '')
    }, [email, isLogin])

    useEffect(() => {
        const pwdErr = validatePassword(pwd)
        setPwdError(pwdErr)
        setPwdValid(pwdErr === '')
    }, [pwd, isLogin])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccess(false)
        setSubmitted(true)

        const emailErr = validateEmail(email)
        const pwdErr = validatePassword(pwd)

        setEmailError(emailErr)
        setPwdError(pwdErr)

        setEmailValid(emailErr === '')
        setPwdValid(pwdErr === '')

        if (emailErr || pwdErr) return

        try {
            let response
            let data

            if (isLogin) {
                // ===== LOGIN REQUEST =====
                // response = await fetch('/api/auth/login', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email, password: pwd })
                // })

            } else {
                // ===== SIGNUP REQUEST =====
                // response = await fetch('/api/auth/register', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ email, password: pwd })
                // })
            }

            // data = await response.json()

            // ===== SUCCESS HANDLING =====
            setSuccess(true)

            if (isLogin) {
                // Example: store token after login
                // localStorage.setItem('token', data.token)

                navigate('/dashboard')
            } else {
                // Signup success behavior
                // Option 1: redirect to login
                // navigate('/login')

                // Option 2: stay and show success
            }

        } catch (err) {
            console.error(err)

            // ===== ERROR HANDLING =====
            setPwdError('Operation failed. Please try again.')
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

                <label htmlFor="email">Email</label>
                <Input
                    id="email"
                    type="text"
                    input={email}
                    setInput={setEmail}
                    placeholder="Enter email"
                    isValid={emailValid}
                    errorMessage={emailError}
                    showValidation={isLogin ? submitted : (emailTouched || submitted)}
                    onFirstInteraction={() => setEmailTouched(true)}
                />

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

                <button type="submit">
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
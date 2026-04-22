import { useEffect, useState } from 'react'
import './Authentication.css'
import Input from '../components/Input'
import { USER_REGEX, PWD_REGEX } from '../components/validation'
import logo from '../assets/logo.svg'

function Authentication({ _state }) {
    const [currState, setCurrState] = useState(_state)
    const [isLogin, setIsLogin] = useState(_state === 'login')

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')

    const [userValid, setUserValid] = useState(false)
    const [pwdValid, setPwdValid] = useState(false)

    const [userError, setUserError] = useState('')
    const [pwdError, setPwdError] = useState('')

    const [showValidation, setShowValidation] = useState(false)
    const [success, setSuccess] = useState(false)

    const resetForm = (nextIsLogin) => {
        setIsLogin(nextIsLogin)
        setUser('')
        setPwd('')
        setUserValid(false)
        setPwdValid(false)
        setUserError('')
        setPwdError('')
        setShowValidation(false)
        setSuccess(false)
    }

    const toggleSignUp = () => {
        const nextIsLogin = !isLogin
        setCurrState(nextIsLogin ? 'login' : 'signup')
        resetForm(nextIsLogin)
    }

    const validateLoginUsername = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }
        return ''
    }

    const validateLoginPassword = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }
        return ''
    }

    const validateSignupUsername = (value) => {
        if (value.trim().length === 0) {
            return 'You cannot leave this field empty'
        }

        if (!USER_REGEX.test(value)) {
            return 'Username must be 8 to 30 characters, start with a letter, include at least one uppercase letter and one digit.'
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

    const validateForm = () => {
        let userErr = ''
        let pwdErr = ''

        if (isLogin) {
            userErr = validateLoginUsername(user)
            pwdErr = validateLoginPassword(pwd)
        } else {
            userErr = validateSignupUsername(user)
            pwdErr = validateSignupPassword(pwd)
        }

        setUserError(userErr)
        setPwdError(pwdErr)

        setUserValid(userErr === '')
        setPwdValid(pwdErr === '')

        return userErr === '' && pwdErr === ''
    }

    useEffect(() => {
        if (!showValidation) return
        validateForm()
    }, [user, pwd, isLogin, showValidation])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSuccess(false)
        setShowValidation(true)

        const formIsValid = validateForm()
        if (!formIsValid) return

        console.log(`Username: ${user}\tPassword: ${pwd}`)
        setSuccess(true)
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

                <label htmlFor="username">Username</label>
                <Input
                    id="username"
                    type="text"
                    input={user}
                    setInput={setUser}
                    placeholder="Enter username"
                    isValid={userValid}
                    errorMessage={userError}
                    showValidation={showValidation}
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
                    showValidation={showValidation}
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
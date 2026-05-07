import { useState } from 'react'
import './Input.css'

function Input({
    id,
    type,
    input,
    setInput,
    placeholder,
    isValid,
    errorMessage,
    showValidation,
    onFirstInteraction
}) {
    const [showPassword, setShowPassword] = useState(false)

    const showError = showValidation && !isValid
    const showValid = showValidation && isValid && input.trim().length > 0

    let className = ''
    if (showError) className = 'input-error'
    else if (showValid) className = 'input-valid'

    const isPasswordInput = type === 'password'
    const inputType = isPasswordInput && showPassword ? 'text' : type

    const handleChange = (e) => {
        onFirstInteraction()
        setInput(e.target.value)
    }

    return (
        <div className="input-field-wrapper">
            <input
                id={id}
                type={inputType}
                value={input}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete="off"
                className={className}
            />

            {isPasswordInput && (
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            )}
        </div>
    )
}

export default Input
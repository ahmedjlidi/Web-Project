import './Input.css'

function Input({
    id,
    type,
    input,
    setInput,
    placeholder,
    isValid,
    errorMessage,
    showValidation
}) {
    const showError = showValidation && !isValid
    const showValid = showValidation && isValid && input.trim().length > 0

    let className = ''
    if (showError) className = 'input-error'
    else if (showValid) className = 'input-valid'

    return (
        <div className="input-wrapper">
            <input
                id={id}
                type={type}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
                className={className}
            />

            {showError && (
                <div id={`${id}-msg`} className="input-popup">
                    {errorMessage}
                </div>
            )}
        </div>
    )
}

export default Input
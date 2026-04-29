export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/
/*
Rules:
- 8 to 24 chars
- at least 1 lowercase
- at least 1 uppercase
- at least 1 digit
- at least 1 special char
*/
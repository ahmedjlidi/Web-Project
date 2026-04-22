export const USER_REGEX = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z][A-Za-z0-9_]{7,29}$//*
Rules:
- starts with a letter
- letters, digits, underscore only
- total length 3 to 16
*/

export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/
/*
Rules:
- 8 to 24 chars
- at least 1 lowercase
- at least 1 uppercase
- at least 1 digit
- at least 1 special char
*/
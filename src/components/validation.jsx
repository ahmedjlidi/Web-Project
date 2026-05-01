export const EMAIL_REGEX = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
// EMAIL_REGEX enforces a practical (not fully RFC-compliant) email format:
//
// ^                         → Start of string
// (?!.*\.\.)               → Disallow consecutive dots anywhere in the email
//
// [a-zA-Z0-9._%+-]+        → Local part (before @):
//                            - Allows letters, digits, dot (.), underscore (_),
//                              percent (%), plus (+), and hyphen (-)
//                            - Must have at least one character
//
// @                         → Required separator between local part and domain
//
// [a-zA-Z0-9-]+            → First domain label:
//                            - Letters, digits, hyphen (-)
//                            - Must have at least one character
//
// (\.[a-zA-Z0-9-]+)*       → Optional additional domain labels (subdomains):
//                            - Each starts with a dot followed by valid label chars
//                            - Allows domains like mail.example.co
//
// \.[a-zA-Z]{2,}           → Top-level domain (TLD):
//                            - Must start with a dot
//                            - Only letters allowed
//                            - Minimum length of 2 (e.g., .com, .org)
//
// $                         → End of string
//
// Notes / Limitations:
// - Does not allow quoted local parts (e.g., "user"@example.com)
// - Does not allow special RFC-valid characters beyond the defined set
// - Does not enforce domain rules like no leading/trailing hyphens
// - Does not validate real domain existence
// - Rejects single-character TLDs (by design)
// - Still allows some edge-case invalid emails per RFC 5322
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/
/*
Rules:
- 8 to 24 chars
- at least 1 lowercase
- at least 1 uppercase
- at least 1 digit
- at least 1 special char
*/
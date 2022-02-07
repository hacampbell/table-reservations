/**
 * Checks that a given email is a valid email, i.e. follows the standard email address
 * convention of 'name@domain.extension'
 * @param {string} email The email to check for validity 
 * @returns true if the email is valid, otherwise false
 */
 exports.isValidEmail = (email) => {
    const trimmedEmail = email.trim();
    // RFC 5322 Complaiant, sourced from emailregex.com
    const expression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return expression.test(trimmedEmail);
}

/**
 * Checks if a given username is valid i.e. is between 3 and 25 characters inclusive,
 * and is alphanumeric.
 * @param {string} username The username to check for validity
 * @returns true if username is valid, otherwise false
 */
 exports.isValidUsername = (username) => {
    const trimmedUsername = username.trim();
    const expression = /^[a-zA-Z0-9_]{3,25}$/;
    return expression.test(trimmedUsername);
}

/**
 * Checks that a users password is valid, i.e. is between 8 and 25 characters, contains
 * both letters and numbers, at least one uppercase letter, and no white space.
 * @param {string} password 
 * @returns true if the password entered is valid, otherwise false
 */
 exports.isValidPassword = (password) => {
    const isAlphaNumeric = /^[a-zA-Z0-9]{8,25}$/;   // Check length & is alphanumeric
    const hasCapital = /[A-Z]/;                     // Check there's at least one capital letter
    const hasNumber = /[0-9]/;                      // Check there's at least one digit

    return isAlphaNumeric.test(password) && hasCapital.test(password) && hasNumber.test(password);
}
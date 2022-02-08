/**
 * Checks that a given email is a valid email, i.e. follows the standard email address
 * convention of 'name@domain.extension'
 * @param {string} email The email to check for validity 
 * @returns true if the email is valid, otherwise false
 */
 exports.isValidEmail = (email) => {
    const trimmedEmail = email.trim();
    const expression = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
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
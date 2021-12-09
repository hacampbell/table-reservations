const User = require('../models/User');

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
 * Checks if a username is unique, i.e. that it does not currently exist in the database
 * @param {string} username The username to check for uniqueness
 * @returns true if the username does not exist in the database, otherwise false
 */
exports.isUniqueUsername = async (username) => {
    const trimmedUsername = username.trim();
    const found = await User.findOne({'username': trimmedUsername});
    return found === null;
}

/**
 * Checks that a given email is a valid email, i.e. follows the standard email address
 * convention of 'name@domain.extension'
 * @param {string} email The email to check for validity 
 * @returns true if the email is valid, otherwise false
 */
exports.isValidEmail = (email) => {
    return 501;
}

/**
 * Checks that a users password is valid, i.e. is between 8 and 25 characters and
 * contains both letters and numbers
 * @param {string} password 
 * @returns true if the password entered is valid, otherwise false
 */
exports.isValidPassword = (password) => {
    return 501;
}
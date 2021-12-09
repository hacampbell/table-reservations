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
    const trimmedEmail = email.trim();
    // RFC 5322 Complaiant, sourced from emailregex.com
    const expression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return expression.test(trimmedEmail);
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

/**
 * A middleware function used to ensure that the server has been sent valid data in a
 * request to create a new user.
 * @param {*} req The request
 * @param {*} res Response
 * @param {*} next Next fucntion to move on to
 */
exports.ValidateNewUser = async (req, res, next) => {
    let errors = [];

    // Ensure that all mandatory fields have been sent in the users request, and that
    // they've been populated with valid data. If they haven't, add a friendly error
    // and move on.

    if (!(req.body.username && this.isValidUsername(req.body.username))) {
        errors.push("Invalid username entered. Username must be between 3 & 25 characters in length and contain only letters and numbers."); 
    }

    if (req.body.username && await this.isUniqueUsername(req.body.username) !== true) {
        errors.push("The username you entered has already been taken.");
    }

    if (!(req.body.email && this.isValidEmail(req.body.email))) {
        errors.push("Invalid email entered.");
    }

    if (!(req.body.password && this.isValidPassword(req.body.password))) {
        errors.push("Invalid password entered. Password must be between 8 & 25 characters in length, contain only letters and numbers with at least one capital letter and at least one number.");
    }

    // If we've been sent bad dad, don't bother going any further. Break out and send
    // the errors back to the user.
    if (errors.length != 0) {
        return res.status(400).json({message: "Unable to create new user. Bad data sent to server.", error: errors});
    }

    next();
} 
const primaryEndpoint =  'http://localhost:3000';

/**
 * Sends a POST request to the login endpoint with a given users details.
 * @param {String} username Username to attempt to login with
 * @param {String} password Password to attempt to login with
 * @returns False if the request failed, the response body otherwise
 */
exports.Login = async (username, password) => {
    const loginRoute = primaryEndpoint + '/user/login';

    // Craft the payload we want to send
    const payload = {
        username: username,
        password: password
    }

    // Make the request
    const response = await fetch(loginRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });


    // Make sure our request was successful
    if (response.status !== 200) return false;

    // Process and return the result
    const respData = await response.json();
    console.log(respData);
    return respData;
}

/**
 * Sends a POST request to the register endpoint with details to create a new
 * user.
 * @param {String} email The email to use to create a user
 * @param {String} username The username to use to create a user
 * @param {String} password The password to use to create a user
 */
exports.Register = async (email, username, password) => {
    const registerRoute = primaryEndpoint + '/user/register';

    // Create payload for rquest
    const payload = {
        email: email,
        username: username,
        password: password
    }

    // Send our request
    const response = await fetch(registerRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    // Process response
    const respData = await response.json();

    // Return what we need to
    if (response.status === 201) {
        return true;
    } else {
        return respData;
    }
}

/**
 * Sends a DELETE request to log a user out by invalidating their refresh token
 * @param {String} token The users refresh token to be used to logout
 */
exports.Logout = async (token) => {
    const logoutRoute = primaryEndpoint + '/user/logout';
    const payload = {refreshToken: token};

    // Send out delete request to log out
    const response = await fetch(logoutRoute, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    // Check that we successfully logged out
    return response.status === 204;
}

/**
 * Decodes and returns the body of a given JWT
 * @param {String} token The JWT to decode
 * @returns {Object} The decoded payload of the JWT
 */
exports.DecodeTokenPayload = (token) => {
    try {
        // Split our token up so we can get the payload
        const splitToken = token.split('.');

        // Decode and return our payload as a JSON object
        const payload = Buffer.from(splitToken[1], 'base64').toString();
        return JSON.parse(payload);
    } catch (err) {
        console.error(`Error in DecodeTokenPayload: ${err.message} This is probably caused by the function being given an empty token.`);
    }
}
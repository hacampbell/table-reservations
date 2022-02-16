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
        // If we've been given a token that's empty, just send back an empty object
        if (token === '' || typeof token === undefined) return {};

        // Split our token up so we can get the payload
        const splitToken = token.split('.');

        // Decode and return our payload as a JSON object
        const payload = Buffer.from(splitToken[1], 'base64').toString();
        return JSON.parse(payload);
    } catch (err) {
        console.error(`Error trying to decode JWT: ${err.message}`);
    }
}

/**
 * Checks if a given access token has expired
 * @param {String} token The users access token to check for validity
 * @returns {Boolean} True if the access token is set and has not expired, otherwise false
 */
exports.ValidateAccessToken = (token) => {
    // Check we've actually been given a token. If not, it's not valid.
    if (token === '' || typeof token === undefined) return false;

    // Decode our payload
    const payload = this.DecodeTokenPayload(token);
    
    // Check that the token hasn't expired
    return (Date.now() <= payload.exp * 1000);
}

/**
 * Sends a POST request to the token endpoint to refresh a given users access token
 * @param {String} token The users refresh token
 * @returns The new access token if successful, otherwise false
 */
exports.RefreshAccessToken = async (token) => {
    const tokenEndpoint = primaryEndpoint + '/user/token';
    const payload = {refreshToken: token};

    // Send request to refresh token
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    // if we didn't successfully refresh the access token, break out
    if (response.status !== 200) return false;

    // If all went well, send the caller back the data
    const data = await response.json();
    return data.accessToken;
}

/**
 * Used to check the user has a valid access and, if not, refreshes said token.
 * @param {Object} caller The Caller of the function. Allows access to Vue calls
 */
exports.CheckAndRefreshToken = async (caller) => {
    // Check that the access token we currently have is valid, if not, refresh it
    if (!this.ValidateAccessToken(caller.$store.getters.GetAccessToken)) {
        const newAccessToken = await this.RefreshAccessToken(caller.$store.getters.GetRefreshToken);

        // If something went wrong refreshing our access token, send the user back to login
        if (newAccessToken === false) {
            caller.$router.push({name: 'Login'});
            return; 
        }

        // Otherwise, set our new access token.
        caller.$store.dispatch('SetAccessToken', newAccessToken);
    }
}
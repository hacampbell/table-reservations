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
    console.log('Register');
    console.log(`${email} ${username} ${password}`);
}
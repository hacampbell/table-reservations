const primaryEndpoint =  'http://localhost:3000';

/**
 * Sends a POST request to the login endpoint with a given users details.
 * @param {String} username Username to attempt to login with
 * @param {String} password Password to attempt to login with
 * @returns {Boolean} True if the fetch request returned a 200 status
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

    // Process and just display the result for now
    const respData = await response.json();
    console.log(respData);

    return response.status === 200;
}
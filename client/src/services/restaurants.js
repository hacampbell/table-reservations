const primaryEndpoint =  'http://localhost:3000';

/**
 * Sends a GET request to the restaurants endpoint, returning the data from
 * said request
 * @param {String} token The users authorisation token
 * @returns False if the request failed, the response body otherwise
 */
exports.GetRestaurants = async (token) => {
    const restaurantRoute = primaryEndpoint + '/restaurants';

    // Make request to get restaurants
    const response = await fetch(restaurantRoute, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // Check that we got an OK status from the server
    if (response.status !== 200) return false;

    // Return the response from the server
    const respData = await response.json();
    return respData;
}
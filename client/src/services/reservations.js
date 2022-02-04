const primaryEndpoint =  'http://localhost:3000';
const reservationsRoute = primaryEndpoint + '/reservations';

/**
 * Sends a GET request to the reservations endpoint, returning the data from
 * said request
 * @param {String} token The users authorisation token
 * @returns {Object} The response from the server
 */
exports.GetReservations = async (token) => {
    // Make request to get reservations
    const response = await fetch(reservationsRoute, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    // Return the response from the server
    const respData = await response.json();
    return respData;
}

/**
 * Sends a POST request to the reservations endpoint creating a new reservation
 * @param {Object} payload An object containing fields for a new reservation
 * @returns {Object} The response from the server
 */
exports.CreatReservation = async (payload, token) => {
    console.log(payload);

    // Make the request to the server
    const response = await fetch(reservationsRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    // Return the response from the server
    const respData = await response.json();
    return respData;
}

/**
 * Cancels a given reservation by its ID
 * @param {String} id The id of the reservation to cancel
 * @param {String} token The users access token
 * @returns True if the request was successful, otherwise false
 */
exports.CancelReservation = async (id, token) => {
    const cancelEndpoint = reservationsRoute + `/${id}`;

    const response = await fetch(cancelEndpoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response.status === 204;
}
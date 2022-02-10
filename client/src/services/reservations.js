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
 * @returns True if the request was successful, otherwise the servers response
 */
exports.CreateReservation = async (payload, token) => {
    // Make the request to the server
    const response = await fetch(reservationsRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    // If the request was successful, just return true
    if (response.status === 201) return true;

    // Return the response from the server
    const respData = await response.json();
    return respData;
}

/**
 * Sends a 'DELETE' request to cancel a given reservation byt its ID
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


/**
 * Sends a 'PATCH' request to update a reservation of a given ID with new data.
 * @param {Object} payload The fields of the reservation to update
 * @param {String} id The ID of the reservation to update
 * @param {String} token The users access token
 * @returns true if the request was suvvessful, otherwise the response body
 */
exports.UpdateReservation = async (payload, id, token) => {
    const updateRoute = reservationsRoute + `/${id}`;

    // Send our request to the server
    const response = await fetch(updateRoute, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    // If the request was successful, return true, otherwise send back the response
    if (response.status === 200) return true;

    // Return the response from the server
    const respData = await response.json();
    return respData;
}
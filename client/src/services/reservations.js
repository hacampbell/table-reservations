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
 * @param {String} name The name to make the reservation under
 * @param {String} time The time to make the reservation for
 * @param {Number} guests The number of guests for the reservation
 * @param {String} rest The name of the restaurant to make the reservation at
 * @param {String} mobile The mobile number to use to make the reservation
 * @param {String} date The date of the reservation
 * @param {String} token The users access token
 * @returns {Object} The response from the server
 */
exports.CreatReservation = async (name, time, guests, rest, mobile, date, token) => {
    // Craft the body of the request
    const payload = {
        reservationName: name,
        time: time,
        numGuests: guests,
        restaurantName: rest,
        mobileNumber: mobile,
        date: date
    }

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
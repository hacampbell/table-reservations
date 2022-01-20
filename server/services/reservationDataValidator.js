const moment = require("moment");
const findRestaurant = require('../services/findRestaurantMiddleware');

/**
 * Checks that a valid name for a reservation has been given. Valid names are
 * considered to be strings of at least 2 characters in length.
 * 
 * @param {String} reservationName 
 * @returns true in the case that a valid name has been given.
 */
exports.isValidReservationName = (reservationName) => {
    return reservationName.trim().length >= 2
}

 /**
 * Checks that a valid reservation date has been given. A valid reservation date
 * is defined as a date within 14 days of the current date. The string should
 * be in the format of YYYY-MM-DD
 * 
 * @param {String} reservationDate 
 * @returns true in the case that a valid reservation date has been given.
 */
exports.isValidReservationDate = (reservationDate) => {
    if (moment(reservationDate, 'YYYY-MM-DD', true).isValid()){
        let today = moment().startOf('day');
        let givenDate = moment(reservationDate, 'YYYY-MM-DD').startOf('day');
        let twoWeeks = today.clone().add(14, 'day').endOf('day');

        return (givenDate.isBetween(today, twoWeeks) || givenDate.isSame(moment(), 'day'));
    } else {
        return false;
    }
}

/**
 * Checks to see if a reservation time is valid. That is, it checks if the user has
 * sent a string that is a time between restaurant opening hour and 30 minutes before
 * closing.
 * 
 * @param {String} time The time to make a reservation for
 * @param {String} restaurantName The restaurant to make the reservation for
 * @returns true if a reservation time is valid
 */
exports.isValidReservationTime = async (time, restaurantName) => {
    // Get the restaurant we want to check our times for
    const restaurant = await findRestaurant.GetRestaurantByName(restaurantName);
    if (restaurant == null) return false;

    // Extract opening and closing times
    const times = restaurant.openingHours.split('-');

    // Convert time strings into moment times
    const resTime = moment(time, 'HH:mm', true);
    const open = moment(times[0], 'HH:mm', true);
    const close = moment(times[1], 'HH:mm', true);
    const lastCall = close.clone().subtract(29, 'm'); // Take 29 minutes from time so as to make 30 valid

    // Finally, determine if the reservation time we've been sent is valid
    return resTime.isBetween(open, lastCall) || resTime.isSame(open);

}

/**
 * Checks if the number of guests input for a reservation is valid. A valid number
 * of guests is defined as being greater than 0 and less than the capacity of the
 * restaurant.
 * 
 * @param {number} guests The number of guests to make a reservation for
 * @param {String} restaurantName The restaurant to make the reservation for
 * @returns true if the number of guests is valid
 */
exports.isValidGuests = async (guests, restaurantName) => {
    const restaurant = await findRestaurant.GetRestaurantByName(restaurantName);
    if (restaurant == null) return false;

    return typeof guests == 'number' && guests <= restaurant.maxGuests;
}

/**
 * Checks if a restaurant name is valid for a reservation. That is, if the restaurant 
 * exists.
 * @param {String} restaurantName 
 * @returns true if the name of a restaurant is valid
 */
exports.isValidRestaurant = async (restaurantName) => {
    const restaurant = await findRestaurant.GetRestaurantByName(restaurantName);
    return restaurant != null;
}

/**
 * Checks if a mobile number is in a valid format, i.e. is only numbers and is 10 characters
 * long
 * e.g. 0404440404
 * 
 * @param {String} mobile 
 * @returns true in the case of a valid mobile number, false otherwise.
 */
exports.isValidMobileNumber = (mobile) => {
    return /[0-9]{10}/.test(mobile);
}

/**
 * Ensures that the users has sent a valid status to the server. This can only be done
 * in a PATCH request in which the users wishes to update their status to cancelled.
 * In the case of making a new reservation, the status is set automatically by the server.
 * @param {String} status 
 */
exports.isValidStatus = (status) => {
    let validStatus = ["Cancelled", "Processing"];
    return validStatus.includes(status.trim());
}

/**
 * A function used as middleware to ensure that valid data has been sent to the server on a
 * POST request to create a new reservation in the database. Validation here ensures that
 * all mandatory fields have been filled in.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.ValidatePostData = (req, res, next) => {
    next();
}

/**
 * Ensures that fields that have been entered in a PATCH request are valid, and that an
 * empty request hasn't been sent to the server.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.ValidatePatchData = (req, res, next) => {
    next();
}
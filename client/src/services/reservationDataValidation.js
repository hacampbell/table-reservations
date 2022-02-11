const moment = require('moment');

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
 * Checks if the number of guests input for a reservation is valid. A valid number
 * of guests is defined as being greater than 0 and less than the capacity of the
 * restaurant.
 * 
 * @param {number} guests The number of guests to make a reservation for
 * @param {Object} restaurantName The restaurant to make the reservation for
 * @returns true if the number of guests is valid
 */
exports.isValidGuests = (guests, maxGuests) => {
    return typeof guests == 'number' && guests <= maxGuests;
}

/**
 * Checks to see if a reservation time is valid. That is, it checks if the user has
 * sent a string that is a time between restaurant opening hour and 30 minutes before
 * closing.
 * 
 * @param {String} time The time to make a reservation for
 * @param {Object} restaurant The restaurant to make the reservation for
 * @returns true if a reservation time is valid
 */
exports.isValidReservationTime = (time, openingHours) => {
    // Extract opening and closing times
    const times = openingHours.split('-');

    // Convert time strings into moment times
    const resTime = moment(time, 'HH:mm', true);
    const open = moment(times[0], 'HH:mm', true);
    const close = moment(times[1], 'HH:mm', true);
    const lastCall = close.clone().subtract(29, 'm'); // Take 29 minutes from time so as to make 30 valid

    // Finally, determine if the reservation time we've been sent is valid
    return resTime.isBetween(open, lastCall) || resTime.isSame(open);

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

exports.isValidReservation = (data, maxGuests, hours) => {
    let errors = [];

    // Ensure that all the mandatory fields have been sent, and that they're populated with
    // valid data. If they're not, add a useful error to the errors array and move on.

    if (!(data.reservationName && this.isValidReservationName(data.reservationName))) {
        errors.push("Invalid reservation name.");
    }

    if (!(data.date && this.isValidReservationDate(data.date))) {
        errors.push("Invalid reservation date.");
    }
    

    if (!(data.time && this.isValidReservationTime(data.time, hours))) {
        errors.push("Invalid reservation time.");
    }

    if (!(data.numGuests && this.isValidGuests(data.numGuests, maxGuests))) {
        errors.push("Invalid number of guests.");
    }


    if (!(data.mobileNumber && this.isValidMobileNumber(data.mobileNumber))) {
        errors.push("Invalid phone number.");
    }

    // Return our list of errors
    return errors;
}
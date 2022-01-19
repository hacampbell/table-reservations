/**
 * Checks that the name of a restaurant is valid i.e. is at least 2 charcters
 * and not more than 45
 * @param {String} name The name of the restaurant
 */
exports.isValidRestaurantName = (name) => {
    const expression = /^[a-zA-Z0-9',:#@$%-_ ]{2,45}$/
    return expression.test(name.trim());
}

/**
 * Checks that the opening hours of the restaurant are valid i.e. is of the
 * format 'xx:xx-xx:xx'
 * @param {String} hours The hours a restaurant is open
 */
exports.isValidOpeningHours = (hours) => {
    const expression = /^[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]$/;
    return expression.test(hours.trim());
}

/**
 * Checks that the opening days of the restaurant are valid. More thought is
 * required for how this will actually function in the working application,
 * so currently in the interest of getting a working demo this will always
 * return true.
 * @param {String} days The days a restaurant is open
 */
exports.isValidOpeningDays = (days) => {
    return true;
}

/**
 * Checks that the contact number entered for a restaurant is valid i.e. is 
 * only numbers and is 10 digits long.
 * @param {String} contact The contact phone number of the restaurant
 */
exports.isValidContactNumber = (contact) => {
    const expression = /^[0-9]{10}$/;
    return expression.test(contact.trim());
}

/**
 * Checks that a valid address has been entered for a restaurant i.e. is a
 * string of the format '[number] [street] [street type], [town]' 
 * e.g. '42 Demo Street, Demo City'
 * @param {String} address The address of the restaurant
 */
exports.isValidAddress = (address) => {
    const expression = /^[0-9]{1,} [a-zA-Z ]{1,}, [a-zA-Z ,.'-]{1,}$/;
    return expression.test(address.trim());
}

/**
 * Checks that a valid description of the restaurant has been entered i.e. is
 * not blank or more than 512 characters
 * @param {String} description The description of the restaurant
 */
exports.isValidDescription = (description) => {
    expression = /^[a-zA-Z0-9,.?!' -]{1,512}$/;
    return expression.test(description.trim());
}

/**
 * Checks that a valid path for an image has been specified i.e. is of the
 * format 'src/assets/img/name.jpg' or 'src/assets/img/name.png'
 * 
 * This is not an overly user friendly approach for validating this field, 
 * however in the interest of getting a working demo, it will be used. The way 
 * that images for restaurants are handled in an actual production setting 
 * would need to be very different.
 * @param {String} image The path for an image of the restaurant 
 */
exports.isValidImage = (image) => {
    expression = /^src\/assets\/img\/+[a-zA-z0-9].+(?:jpg|png|jpeg)$/;
    return expression.test(image.trim());
}

/**
 * Checks that a valid number for the maximum number of guests at the
 * restaurant has been entered. i.e. a number that is greater than 0. Returns
 * true if a valid number has been entered, otherwise false.
 * @param {Number} capacity 
 */
exports.isValidMaxGuests = (capacity) => {
    return typeof capacity == 'number' && capacity > 0;
}

/**
 * Middleware that checks the user has sent valid data in their post request to
 * create a new restaurant. If bad data is found, a list of errors is returned
 * to the client and the next function is not called.
 * @param {Object} req The http request
 * @param {Object} res Our response object
 * @param {Function} next Next function to call
 */
exports.isValidPost = (req, res, next) => {
    let errors = [];

    if (!req.body.name || !this.isValidRestaurantName(req.body.name)) {
        errors.push('Invalid restaurant name');
    }

    if (!req.body.openingHours || !this.isValidOpeningHours(req.body.openingHours)) {
        errors.push('Invalid opening hours');
    }

    if (!req.body.openingDays || !this.isValidOpeningDays(req.body.openingDays)) {
        errors.push('Invalid opening days');
    }

    if (!req.body.contactNumber || !this.isValidContactNumber(req.body.contactNumber)) {
        errors.push('Invalid contact number');
    }

    if (!req.body.address || !this.isValidAddress(req.body.address)) {
        errors.push('Invalid address');
    }

    if (!req.body.description || !this.isValidDescription(req.body.description)) {
        errors.push('Invalid description');
    }

    if (!req.body.image || !this.isValidImage(req.body.image)) {
        errors.push('Invalid image')
    }

    if (!req.body.maxGuests || !this.isValidMaxGuests(req.body.maxGuests)) {
        errors.push('Invalid maxGuests')
    }

    if (errors.length > 0) {
        return res.status(400).json({messgae: 'Bad data sent to server', error: errors});
    }

    next();
}

/**
 * Middleware that checks the user has enetered valid data for fields they wish
 * to update for a restaurant. Returns a list of errors to the client in the
 * case that bad data is sent to the server, otherwise the next function is
 * called.
 * @param {Object} req The http request
 * @param {Object} res Our response object
 * @param {Function} next Next function to call
 */
exports.isValidPatch = (req, res, next) => {
    let errors = [];

    if (req.body.name && !this.isValidRestaurantName(req.body.name)) {
        errors.push('Invalid restaurant name');
    }

    if (req.body.openingHours && !this.isValidOpeningHours(req.body.openingHours)) {
        errors.push('Invalid opening hours');
    }

    if (req.body.openingDays && !this.isValidOpeningDays(req.body.openingDays)) {
        errors.push('Invalid opening days');
    }

    if (req.body.contactNumber && !this.isValidContactNumber(req.body.contactNumber)) {
        errors.push('Invalid contact number');
    }

    if (req.body.address && !this.isValidAddress(req.body.address)) {
        errors.push('Invalid address');
    }

    if (req.body.description && !this.isValidDescription(req.body.description)) {
        errors.push('Invalid description');
    }

    if (req.body.image && !this.isValidImage(req.body.image)) {
        errors.push('Invalid image')
    }

    if (req.body.maxGuests && !this.isValidMaxGuests(req.body.maxGuests)) {
        errors.push('Invalid maxGuests')
    }

    if (errors.length > 0) {
        return res.status(400).json({messgae: 'Bad data sent to server', error: errors});
    }

    next();
}
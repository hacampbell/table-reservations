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

}

/**
 * Checks that a valid description of the restaurant has been entered i.e. is
 * not blank or more than 512 characters
 * @param {String} description The description of the restaurant
 */
exports.isValidDescription = (description) => {

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
    return clsexpression.test(image.trim());
}
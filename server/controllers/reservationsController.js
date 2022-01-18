const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

/**
 * Gets all reservations in the database if the user is an admin, gets all reservations for
 * their restaurant if the user is a restaurateur, or gets all reservations they've made if
 * the user is just a user.
 * @param {Object} req The HTTP request object 
 * @param {Object} res Our response object
 */
exports.GetAllReservations = async (req, res) => {
    // res.status(501).json({message: 'GetAllReservations Pending Implementation', user: res.user});
    try {
        const user = res.user;  // Make our user data slightly easier to access

        // Send admins all reservations in the database
        if (user.role === 'admin') {
            const reservations = await Reservation.find();
            return res.status(200).json(reservations);
        }

        // Send Restaurateurs all reservations for their restaurant
        if (user.role === 'restaurateur') {
            const restaurant = await Restaurant.findOne({owner: user.username});    // Restaurant user owns
            const reservations = await Reservation.find({restaurant: restaurant});  // Reservations at said restaurant
            return res.status(200).json(reservations);
        }

        // Send Users the reservations they've made
        if (user.role === 'user') {
            const reservations = await Reservation.find({username: user.username});
            return res.status(200).json(reservations);
        }

        return res.status(403).json({message: 'You do not have permission to access this endpoint'})

    } catch (err) {
        res.status(500).json({message: 'An error occured trying to get reservations.', error: err.message});
    }
}
/**
 * Gets the information about a single reservation. Admins can see any reservation, restaurateurs
 * can get information about reservations at their restaurant, and users can only see information
 * about reservations they've made.
 * @param {Object} req The HTTP request object 
 * @param {Object} res Our response object
 */
exports.GetSingleReservation = async (req, res) => {
    res.status(501).json({message: 'GetSingleReservation Pending Implementation', user: res.user});
}

/**
 * Creates a reservation in the system. Can only be done by admins and users.
 * @param {Object} req The HTTP request object 
 * @param {Object} res Our response object
 */
exports.CreateReservation = async (req, res) => {
    try {
        const user = res.user;
        // Restaurateur's can't make reservations on the platform
        if (user.role === 'restaurateur') return res.status(403).json({message: 'You cannot access this endpoint'});

        const reservation = new Reservation({
            reservationName: req.body.reservationName,
            username: user.username,
            time: req.body.time,
            numGuests: req.body.numGuests,
            restaurantName: req.body.restaurantName,
            mobileNumber: req.body.mobileNumber,
            specialRequests: req.body.specialRequests,
            date: req.body.date,
            status: 'Processing'

        });

        const newRes = await reservation.save();
        return res.status(201).json({newRes});
    } catch (err) {
        res.status(500).json({message: 'An error occured trying to create reservation.', error: err.message});
    }
}

/**
 * Updates information about a reservation. Admins can update any reservation, restaurateurs can
 * update reservations at their restaurant, and users can only update reservations created by
 * them.
 * @param {Object} req The HTTP request object 
 * @param {Object} res Our response object
 */
exports.UpdateReservation = async (req, res) => {
    res.status(501).json({message: 'UpdateReservation Pending Implementation', user: res.user});
}

/**
 * Soft deletes a reservation by setting its status to 'Cancelled'. Admins can cancel any
 * reservations, and users can only cancel reservations made by them.
 * @param {Object} req The HTTP request object 
 * @param {Object} res Our response object
 */
exports.CancelReservation = async (req, res) => {
    // Ensure that we're not allowing just anyone to cancel peoples reservations
    if (res.user.role !== 'admin' && res.reservation.username !== res.user.username) {
        return res.status(403).json({message: 'You do not have permission to cancel that reservation'});
    }

    // Let the user know if they're trying to cancel a reservation that's already been cancelled
    if (res.reservation.status === 'Cancelled') {
        return res.status(409).json({message: 'This reservation has already been cancelled'});
    }

    // If we've gotten to this point, it's all OK to set the status of the reservation
    // to cancelled.
    res.reservation.status = 'Cancelled';
    await res.reservation.save();
    res.status(200).json({message: 'Reservation cancelled'});
}
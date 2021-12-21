const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');

/**
 * Gets all reservations in the database if the user is an admin, gets all reservations for
 * their restaurant if the user is a restaurateur, or gets all reservations they've made if
 * the user is just a user.
 * @param {*} req 
 * @param {*} res 
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
 * @param {*} req 
 * @param {*} res 
 */
exports.GetSingleReservation = async (req, res) => {
    res.status(501).json({message: 'GetSingleReservation Pending Implementation', user: res.user});
}

/**
 * Creates a reservation in the system. Can only be done by admins and users.
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateReservation = async (req, res) => {
    res.status(501).json({message: 'CreateReservation Pending Implementation', user: res.user});
}

/**
 * Updates information about a reservation. Admins can update any reservation, restaurateurs can
 * update reservations at their restaurant, and users can only update reservations created by
 * them.
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateReservation = async (req, res) => {
    res.status(501).json({message: 'UpdateReservation Pending Implementation', user: res.user});
}

/**
 * Soft deletes a reservation by setting its status to 'Cancelled'. Admins can cancel any
 * reservations, restaurateurs can cancel reservations at thier own restaurant, and users can
 * only cancel reservations made by them.
 * @param {*} req 
 * @param {*} res 
 */
exports.CancelReservation = async (req, res) => {
    res.status(501).json({message: 'DeleteReservation Pending Implementation', user: res.user});
}
const Reservation = require('../models/Reservation');

/**
 * A small middleware function used to get a reservation by a given ID and
 * add it to the res object for use in the next function.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.GetReservationByID = async (req, res, next) => {
    let reservation;

    try {
        reservation = await Reservation.findById(req.params.id);
        if (reservation == null) {
            return res.status(404).json({message: 'No reservation found'});
        }
    } catch (err) {
        return res.status(500).json({message: 'An error occured trying to get reservation', error: err.message});
    }

    res.reservation = reservation;
    next();
}
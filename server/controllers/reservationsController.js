/**
 * A 'Quick & Dirty' test to check that the route is working. Delete before moving
 * to production.
 * @param {*} req Data sent in the request to the server
 * @param {*} res Our response
 */
 exports.Test = async (req, res) => {
    res.status(501).json({message: 'Pending implementation'});
}
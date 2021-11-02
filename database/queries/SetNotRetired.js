const Artist = require('../models/artist');

/**
 * Sets a group of Artists as not retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
module.exports = (_ids) => {
    //console.log(_ids);
    // return Artist.updateMany(
    //     { _id: { $in: _ids } },
    //     { retired: false }
    // )
    return Artist.update(
        { _id: { $in: _ids } },
        { retired: false },
        { multi: true }
    )
};

'use strict';

module.exports = function (app) {
    const bidsHandler = require('../controllers/BidController');

    app.route('/bids')
        .get(bidsHandler.getBids);
    app.route('/bids/addBid')
        .post(bidsHandler.addBid);
    app.route('/bids/:name')
        .patch(bidsHandler.updateBid);
    app.route('/bids/:name')
        .delete(bidsHandler.deleteBid);
};
'use strict';

module.exports = function (app) {
    const auctionHandler = require('../controllers/AuctionsController');

    app.route('/auctions')
        .get(auctionHandler.getAllAuctions);
    app.route('/auctions/:title')
        .get(auctionHandler.getAuctionByName);
    app.route('/auctions/:initialPrice')
        .get(auctionHandler.getAuctionsByInitialPrice);
    app.route('/auctions')
        .post(auctionHandler.addAuction);
    app.route('/auctions/:title')
        .patch(auctionHandler.updateAuction);
    app.route('/auctions/:title')
        .delete(auctionHandler.deleteAuction);
};
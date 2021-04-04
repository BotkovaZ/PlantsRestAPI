'use strict';

const mongoose = require('mongoose');
const Bid = mongoose.model('Bid');

//////////get all bids
exports.getBids = function (req, res) {
    Bid.find((err, foundBids) => {
        if (err) {
            res.status(StatusCodes.NOT_FOUND).send(err);
        } else {
            res.status(StatusCodes.OK).send(foundBids);
        }
    })
};

///////////////get bid by name
exports.getBidByName = function(req, res) {

    Bid.find({name: req.params.name}, (err, foundBids) => {
        if (foundBids) {
            res.status(StatusCodes.OK).send(foundBids);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(err);
        }
    });
};

//////////add bid
exports.addBid = function (req, res) {
    const newBid = new Bid({
        name: req.body.name,
        bidPrice: req.body.bidPrice,
        createdBy: req.body.createdBy
    });

    newBid.save((err) => {
        if (!err) {
            res.status(StatusCodes.CREATED).send("Bid was added successfully.");
        } else {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
    })
};

/////////update bid
exports.updateBid = function (req, res) {
    Bid.update(
        {name: req.params.name},
        {$set: req.body},
        function (err) {
            if (!err) {
                res.status(StatusCodes.OK).send("Bid was updated successfully.");
            } else {
                res.status(StatusCodes.FORBIDDEN).send(err);
            }
        }
    )
};

////////delete bid
exports.deleteBid = function (req, res) {
    Bid.deleteOne(
        {name: req.params.name},
        function (err) {
            if (!err) {
                res.status(StatusCodes.OK).send("The bid was deleted successfully.");
            }
        }
    )
};


















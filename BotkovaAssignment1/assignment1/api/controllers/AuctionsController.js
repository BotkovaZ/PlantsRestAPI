'use strict';

const mongoose = require('mongoose');
const Auction = mongoose.model('Auction');
const {
    StatusCodes,
    getReasonPhrase
} = require('http-status-codes');

exports.getAllAuctions = function (req, res) {
    Auction.find((err, auctions) => {
        if (!err) {
            res.status(StatusCodes.OK).send(auctions);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(err);
        }
    })
};

exports.getAuctionsByInitialPrice = function (req, res) {
    Auction.find({ initialPrice: req.params.initialPrice}, (err, auctions) => {
        if (auctions) {
            res.status(StatusCodes.OK).send(auctions);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(err);
        }
    })
};

exports.getAuctionByName = function (req, res) {
    Auction.findOne({title: req.params.title}, (err, auction) => {
        if (auction) {
            res.status(StatusCodes.OK).send(auction);
        } else {
            res.status(StatusCodes.NOT_FOUND).send(err);
        }
    })
};

exports.addAuction = function (req, res) {
    const newAuction = new Auction({
        title: req.body.title,
        description: req.body.description,
        initialPrice: req.body.initialPrice,
        endDay: req.body.endDay
    });

    newAuction.save((err) => {
        if (!err) {
            res.status(StatusCodes.CREATED).send("New auction added successfully.");
        } else {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
    })
};

exports.updateAuction = function (req, res) {
    Auction.update({title: req.params.title}, {$set: req.body}, (err) => {
        if (!err) {
            res.status(StatusCodes.ACCEPTED).send("Auction successfully updated");
        } else {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
    })
};

exports.deleteAuction = function (req, res) {
    Auction.deleteOne({title: req.params.title}, (err) => {
        if (!err) {
            res.status(StatusCodes.OK).send("Auction successfully deleted");
        } else {
            res.status(StatusCodes.BAD_REQUEST).send(err);
        }
    })
};
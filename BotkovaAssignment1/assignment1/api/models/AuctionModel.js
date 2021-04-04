'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuctionSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    initialPrice: {
        type: Number
    },
    endDay: {
        type: Date
    }
});

mongoose.model('Auction', AuctionSchema);
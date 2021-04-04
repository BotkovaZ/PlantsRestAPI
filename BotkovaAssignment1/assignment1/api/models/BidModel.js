'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BidSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: true
    },
    bidPrice: {
        type: Number
    },
    createdBy: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Bid', BidSchema);
'use strict';

const express = require('express');
const app = express();
const port = 3000;

const User = require('./models/UserModel');
const Auction = require('./models/AuctionModel');
const Bid = require('./models/BidModel');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/auctions', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

app.use(bodyParser.urlencoded({ encoded: true }));
app.use(bodyParser.json());



const userRoute = require('./routes/UserRouter');
userRoute(app);

const auctionRoute = require('./routes/AuctionsRouter');
auctionRoute(app);

const bidRoute = require('./routes/BidsRouter');
bidRoute(app);

app.listen(port, () => {
    console.log("Server running on port " + port);
});

module.exports = app;
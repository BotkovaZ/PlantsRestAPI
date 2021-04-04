'use strict';

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');

exports.register = function (req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            repeatPassword: hash,
            roles: req.body.roles
        });

        newUser.save((err) => {
            if (err) {
                res.status(StatusCodes.BAD_REQUEST).send('Username already in use.');
            } else {
                res.status(StatusCodes.CREATED).send("New user registered successfully.");
            }
        })
    });
};

exports.sign_in = function (req, res, next) {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication failed. Incorrect username or password'});
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESFULAPIs') });
    });
};


exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user!!!'});
    }
};

// exports.profile = function (req, res, next) {
//     if (req.user) {
//         res.send(req.user);
//         next();
//     } else {
//         return res.status(401).json({ message: 'Invalid token'});
//     }
// };
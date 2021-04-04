'use strict';

module.exports = function (app) {
    const userHandler = require('../controllers/UserController');

    app.route('/auth/register')
        .post(userHandler.register);
    app.route('/auth/sign_in')
        .post(userHandler.sign_in);
};
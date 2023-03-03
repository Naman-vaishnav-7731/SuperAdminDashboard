const express = require('express');
const Router = express.Router();
const {Adminlogin} = require('../Controllers/AdminControllers');


// Implement Super Admin Login Routes
Router.route('/login').post(Adminlogin)

module.exports = Router;


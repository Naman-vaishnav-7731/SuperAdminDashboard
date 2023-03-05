const express = require('express');
const Router = express.Router();
const {Adminlogin , Adminlogout , addAdmin} = require('../Controllers/AdminControllers');

// Implement Super Admin Login Routes
Router.route('/login').post(Adminlogin);

// Implement Super Admin Logout Routes
Router.route('/logout').post(Adminlogout);

// Implement Add Super Admin 
Router.route('/addadmin').post(addAdmin);

module.exports = Router;


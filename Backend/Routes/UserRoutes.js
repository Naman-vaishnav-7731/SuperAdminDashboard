const express = require('express');
const Router = express.Router();
const {getUsers , addUser , updateUser , deleteUser , getUser} = require("../Controllers/UserControllers");

// AdminAuth Middleware to Verfiy Correct Token
const AdminAuth = require('../middleware/AdminAuthMiddleware');

// Get all user
Router.route('/').get([AdminAuth , getUsers]);

// Get User
Router.route('/:user_email').get([AdminAuth , getUser]);

// Add Roles
Router.route('/').post([AdminAuth , addUser]);

// Update Role
Router.route('/:user_email').put([AdminAuth , updateUser]);

// Add Roles
Router.route('/:user_email').delete([AdminAuth , deleteUser]);

// Router.route("/addpermission").post([AdminAuth , addPermission]);

module.exports = Router;




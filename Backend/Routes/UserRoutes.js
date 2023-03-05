const express = require('express');
const Router = express.Router();
const {getUsers , addUser , updateUser , deleteUser , addPermission} = require("../Controllers/UserControllers");

// AdminAuth Middleware to Verfiy Correct Token
const AdminAuth = require('../middleware/AdminAuthMiddleware');

// Get all Roles
Router.route('/').get([AdminAuth , getUsers]);

// Add Roles
Router.route('/').post([AdminAuth , addUser]);

// Update Role
Router.route('/:user_email').put([AdminAuth , updateUser]);

// Add Roles
Router.route('/:user_email').delete([AdminAuth , deleteUser]);

// add permissons for users
Router.route("/addpermission").post([AdminAuth , addPermission]);

module.exports = Router;




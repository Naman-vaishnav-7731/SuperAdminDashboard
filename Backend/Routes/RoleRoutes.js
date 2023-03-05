const express = require('express');
const Router = express.Router();
const {getRoles , addRole , updateRole , deleteRole } =  require("../Controllers/RoleControllers");

// AdminAuth Middleware to Verfiy Correct Token
const AdminAuth = require('../middleware/AdminAuthMiddleware');

// Get all Roles
Router.route('/').get([AdminAuth , getRoles]);

// Add Roles
Router.route('/').post([AdminAuth , addRole]);

// Update Role
Router.route('/:Role_id').put([AdminAuth , updateRole]);

// Add Roles
Router.route('/:Role_id').delete([AdminAuth , deleteRole]);

module.exports = Router;





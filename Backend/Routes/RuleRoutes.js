const express = require('express');
const Router = express.Router();
const {getRules , addRule , updateRule , deleteRule} =  require("../Controllers/RuleControllers");

// AdminAuth Middleware to Verfiy Correct Token
const AdminAuth = require('../middleware/AdminAuthMiddleware');

// Get all  Rule
Router.route('/').get([AdminAuth , getRules]);

// Add  Rule
Router.route('/').post([AdminAuth , addRule]);

// Update Rule
Router.route('/:Rule_id').put([AdminAuth , updateRule]);

// Add  Rule
Router.route('/:Rule_id').delete([AdminAuth , deleteRule]);

module.exports = Router;


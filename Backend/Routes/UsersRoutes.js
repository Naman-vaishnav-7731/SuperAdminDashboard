const express = require('express');
const Router = express.Router();
const {getUser , RegisterUser , DeleteUser , UpdateUser , LoginUser ,CurrentUser } = require('../Controllers/UsersControllers')
const Protect = require('../middleware/Authmiddleware')
// upload image
const multer = require('multer');

 // Upload profile image
 const uploadProfile = multer({
    storage:multer.diskStorage({
        destination:(req , file , callback) => {
            callback(null , './ProfileImages')
        },
        filename:(req , file , callback) => {
            callback(null , file.fieldname + "-" + Date.now() + ".jpg");
        }

    })
    
}).single("ProfileImages");

// Router for read the user profile
Router.route('/').get([Protect , getUser]);
// Router.route('/').get(validateUser , getUser);

// Router for create the user profile | Register
// implement the server side validation
Router.route('/register').post(RegisterUser);

// Router for login  the user
Router.route('/login').post(LoginUser);

// Router for current user info
Router.route('/:email').get(CurrentUser);

// Router for update the user profile
Router.route('/:email').put(UpdateUser);

// Router for delete the user profile
Router.route('/:email').delete([ Protect, DeleteUser]);

module.exports = Router;
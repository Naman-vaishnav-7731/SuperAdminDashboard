const express = require('express');
const Router = express.Router();
const {RegisterUser , DeleteUser , UpdateUser , LoginUser ,CurrentUser , getUserData} = require('../Controllers/UsersControllers')

// Protect is middleware to identify authorized user
const Protect = require('../middleware/Authmiddleware')
const Auth = require('../middleware/AdminAuthMiddleware')

// upload image
const multer = require('multer');

 // Upload profile image in location:D:\\ReactWorkspace\\StudyHub\\hostelapp\\src\\ProfileImages
 const uploadProfile = multer({
    storage:multer.diskStorage({
        destination:(req , file , callback) => {
            callback(null , 'D:\\ReactWorkspace\\StudyHub\\hostelapp\\public\\userImage')
        },
        filename:(req , file , callback) => {
            console.log({file})
            callback(null , file.fieldname  + "-" + Date.now() + ".jpg");
        }

    })
    
}).single("profileImage");

// Router for read the user profile
// Router.route('/').get([Protect , getUser]);
// Router.route('/').get(validateUser , getUser);

//Implenet Routes for Pagination and filter 
// /users/
Router.route('/').get([Auth , getUserData]);

// Router for create the user profile | Register
// implement the server side validation
Router.route('/register').post([uploadProfile , RegisterUser]);

// Router for login  the user
Router.route('/login').post(LoginUser);

// Router for current user info
Router.route('/:email').get(CurrentUser);

// Router for update the user profile
Router.route('/:email').put(UpdateUser);

// Router for delete the user profile
Router.route('/:email').delete([ Protect, DeleteUser]);

module.exports = Router;
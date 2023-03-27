const express = require('express');
const Router = express.Router();

// AdminAuth Middleware to Verfiy Correct Token
const AdminAuth = require("../middleware/AdminAuthMiddleware");

// upload image
const multer = require('multer');

 // Upload profile image in location:D:\\ReactWorkspace\\StudyHub\\hostelapp\\src\\ProfileImages
 const uploadProductimage = multer({
    storage:multer.diskStorage({
        destination:(req , file , callback) => {
            callback(null , 'D:\\ReactWorkspace\\StudyHub\\hostelapp\\public\\Productimage')
        },
        filename:(req , file , callback) => {
            console.log({file})
            callback(null , file.fieldname  + "-" + Date.now() + ".jpg");
        }

    })
    
}).single("productimage");

const {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = require("../Controllers/ProductControllers");

// Get all Product
Router.route('/').get([AdminAuth , getAllProducts]);

// Add Product
Router.route('/').post([uploadProductimage , AdminAuth , addProduct]);

// Update Product
Router.route('/:id').put([AdminAuth , updateProduct]);

// Delete Product
Router.route('/:id').delete([AdminAuth , deleteProduct]);

module.exports = Router;





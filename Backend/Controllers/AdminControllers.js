const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../models");
const Admin = db.admin;
// Genrate The JWT Token
const genreteToken = require("../Util/genreteToken");

// @desc Admin Login | @Route admin/login | @Access Only Super admin
const Adminlogin = asyncHandler(async (req , res) => {

    // validate the login Credentitals
    const {admin_name , admin_email , password} = req.body;
    console.log(admin_name , admin_email , password);

    const hashpassword = await bcrypt.hash(password , 10);
    
    const admin = await Admin.create({
        admin_name,
        admin_email,
        password: hashpassword
});


    res.status(200).json({message:"Suceessfully login"});
})

module.exports = {Adminlogin};


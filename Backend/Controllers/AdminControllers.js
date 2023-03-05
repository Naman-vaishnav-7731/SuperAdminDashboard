const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const db = require("../models");
const Admin = db.admin;
// Genrate The JWT Token
const genrateToken = require("../Util/genrateAdminToke");

// Implement Validate Login Fileds 
const validatelogin = require("../Validations/admin_login");


// @dec Admin Create | @Route admin/addadmin | @Access is Disable
const addAdmin = asyncHandler(async (req , res) => {
  const {admin_name , admin_email , password} = req.body;
  const hashedPassword = await bcrypt.hash(password , 10);

  try {
    const addAdmin = await Admin.create({
      admin_email,
      admin_name,
      password:hashedPassword
    })
    if(addAdmin){
      res.status(200).json({message:"successfully admin is added"});
    }
    
  } catch (error) {
      console.log(error);
      res.status(500).json({err:error});
  }
});

// @desc Admin Login | @Route admin/login | @Access Only Super admin
const Adminlogin = asyncHandler(async (req, res) => {
  // validate the login Fileds
  const { errors, isValid } = validatelogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const adminData = await Admin.findOne({
    where: { admin_email: req.body.admin_email },
  });

  // compare user password with hashpassword
  if (
    adminData &&
    (await bcrypt.compare(req.body.password, adminData.password))
  ) {

    // Store Token and Send Using Cookie
    const Token = genrateToken(adminData.admin_email);
    // User http only so this token send by http and https request only
    res
      .status(200)
      .cookie("jwt_Token", Token ,  { httpOnly: true })
      .send({
        email: adminData.admin_email,
        name: adminData.admin_name,
        message: "Sucessfully Login",
      });

    // Send JWT Token in Cookie
  } else {
    res.status(400).json({ message: "Email and password is not match" });
    throw new Error("Email and password is not match");
  }
});

// @DESC Admin login | @ROUTE /logout | @Access by Super Admin
const Adminlogout = asyncHandler(async (req , res) => {
    res.clearCookie("jwt_Token").json({message:"Successfully Logout"});
})

module.exports = { Adminlogin , Adminlogout , addAdmin };


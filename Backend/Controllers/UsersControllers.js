const db = require("../models");
const bcrypt = require("bcrypt");
const Op = db.Sequelize.Op;
const Users = db.users;
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const genreteToken = require("../Util/genreteToken");
const validateRegistartion = require("../Validations/Registration");
const validatelogin = require("../Validations/login");
const validateUpdateProfile = require("../Validations/UpdateProfile");

// get pagination | page no and | size of one page
const getPagination = (page, size) => {
  // limit qual size of one page
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalusers, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalusers / limit);

  return { totalusers, users, totalPages, currentPage };
};

//getUsers Data But Implement Limit and Offset For Pagination and Serach Filter
const getUserData = asyncHandler(async (req, res) => {
  const { search, page, size } = req.query;

  // user search something
  const serachUser = search
    ? {
        [Op.or]: [
          {
            fname: { [Op.like]: `%${search}%` },
          },
          {
            lname: { [Op.like]: `%${search}%` },
          },
          {
            email: { [Op.like]: `%${search}%` },
          },
          {
            phone: { [Op.like]: `%${search}%` },
          },
          {
            address: { [Op.like]: `%${search}%` },
          },
          {
            pincode: { [Op.like]: `%${search}%` },
          },
        ],
      }
    : null;

  // set limit and size
  const { limit, offset } = getPagination(Number(page), Number(size));

  //Serach user data
  try {
    const data = await Users.findAndCountAll({
      where: serachUser,
      limit: limit,
      offset: offset,
    });
    const response = getPagingData(data, Number(page), limit);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "some errors occurred while retrieving users" });
  }
});

// create a new user | @route /users | @access public
const RegisterUser = asyncHandler(async (req, res) => {
  const file = req.file?.filename;
  console.log({ file });
  // console.log({file:req.file});
  // console.log(file);

  // implement server side validations
  const { errors, isValid } = validateRegistartion(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { fname, lname, email, password, phone, address, pincode, userType } =
    req.body;

  // check Email is already exits or not
  const emailExits = await Users.findOne({ where: { email: email } });
  if (emailExits) {
    return res.status(400).json({ message: "Email is already Exits" });
  }

  // hash password for security purposes
  const hashedPassword = await bcrypt.hash(password, 10);

  // create the user in table
  const user = await Users.create({
    fname,
    lname,
    email,
    password: hashedPassword,
    phone,
    address,
    pincode,
    userType,
    image: file,
  });
  console.log(user);
  // if the user succesfully created
  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      Token: genreteToken(user._id),
    });
  } else {
    res.status(400).json({ message: "User Data is not valid" });
    throw new Error("user data is not valid");
  }
});

// @desc Authenticate the user | @route /users/login | @access public
const LoginUser = asyncHandler(async (req, res) => {
  // implement server side validations
  const { errors, isValid } = validatelogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const userData = await Users.findOne({ where: { email: req.body.email } });
    // compare user password with hashpassword
    if (
      userData &&
      (await bcrypt.compare(req.body.password, userData.password))
    ) {
      res.status(200).json({
        Token: genreteToken(userData.id),
        fname: userData.fname,
        lname: userData.lname,
        userType: userData.userType,
        email: userData.email,
      });
    } else {
      res.status(400).json({ message: "Email and password is not match" });
      throw new Error("Email and password is not match");
    }
  } catch (error) {
    console.log(error);
  }
});

// current user | @route /users | @access private | @access User and Admin
const CurrentUser = asyncHandler(async (req, res) => {
  const { email } = req.params;

  // Email is exiting or not
  const userExits = await Users.findOne({ where: { email } });
  console.log(userExits);

  if (!userExits) {
    return res.status(404).json({ message: "Email is Not Found" });
  }

  res.status(200).json(userExits);
});

// Update a user | @route /users/:email | @access Private
const UpdateUser = asyncHandler(async (req, res) => {
  // const {errors , isValid} = validateUpdateProfile(req.body);
  // if(!isValid){
  //     return res.status(400).json(errors);
  // }

  const { email } = req.params;

  // Email is exiting or not
  const userExits = await Users.findOne({ where: { email } });

  if (!userExits) {
    return res.status(404).json({ message: "Email is Not Found" });
  }

  // Update the User Detials
  const userData = {
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address,
    pincode: req.body.pincode,
    phone: req.body.phone,
  };
  try {
    await Users.update(userData, { where: { email } });
    res.status(200).json({ message: "Sucessfully User Data Updated" });
  } catch (error) {
    console.log(error);
    throw new Error("Data is not Updated");
  }
});

// Delete user | @route /users/:email | @access Private
const DeleteUser = asyncHandler(async (req, res) => {
  const { email } = req.params;
  // Email is exiting or not
  const userExits = await Users.findOne({ where: { email } });

  if (!userExits) {
    return res.status(404).json({ message: "Email is Not Found" });
  }

  await Users.destroy({ where: { email: userExits.email } });
  res.status(200).json({ message: "Sucessfully User Is Deleted" });
});

module.exports = {
  RegisterUser,
  DeleteUser,
  UpdateUser,
  LoginUser,
  CurrentUser,
  getUserData,
};

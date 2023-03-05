const asyncHandler = require("express-async-handler");
const db = require("../models");
const user = db.user;
const role = db.role;
const Rule = db.rule;
const Permission = db.permission;
const brcypt = require("bcrypt");

// @DESC - Get all Users | @Route - /user | @Access - Private Only Super Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await user.findAll({ include: role });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Some error is found while get user data" });
    throw new Error("Some error is occurs");
  }
});

// @DESC - Add user | @Route - /user | @Access - Private
const addUser = asyncHandler(async (req, res) => {
  const { user_email, password, RoleRoleId } = req.body;

  // check user_email is already exits or not
  // If Role is already Exits
  try {
    const userExits = await user.findOne({ where: { user_email: user_email } });
    if (userExits) {
      return res
        .status(400)
        .json({ message: "oops ! Sir User is Already Exits" });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some error is occur while finding the user email");
  }

  const hasedPassword = await brcypt.hash(password, 10);
  const users = {
    user_email,
    RoleRoleId,
    password: hasedPassword,
  };

  // add user
  try {
    const adduser = await user.create(users);

    if (addUser) {
      res.status(200).json({ message: "Sucessfully Add User" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error Found while Adding the user" });
  }
});

//@DESC Add User Permision | @Route- /user/addpermission | @Access Private
const addPermission = asyncHandler(async (req, res) => {
  
// for multiple permission on multiple rules
// it could be possible same user can have multiple permission on same rule or differnt rule
  const {userPermission} = req.body;
  userPermission.map(async (element) => {
        try {
                const user_email = element.user_email;
                const Rule_id = element.rule_id;
                const permission_code = element.permission_code;
                
                // Finding the userRecord | user is exits or not in DB
                const userRecord = await user.findOne({ where: { user_email } });
                if (!userRecord) {
                return res.status(400).json({ message: "User not found" });
                }

                // Find the rule with the given ID
                const ruleRecord = await Rule.findOne({where:{ Rule_id }});
                if (!ruleRecord) {
                    return res.status(400).json({ message: "Rule not found" });
                }

                // Find the permission with the given code
                const permissionRecord = await Permission.findOne({ where: { permission_code } });
                if (!permissionRecord) {
                    return res.status(400).json({ message: "Permission not found" });
                }

                await ruleRecord.addPermission(permissionRecord);
                await userRecord.addPermission(permissionRecord);
                res.status(200).json({message:"Succesfully permission asssin"});

        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Some error is occur while assing user permissions"});
        }
    });
});


//@DESC - Update user | @Route - /user/:email | @Access - Private
const updateUser = asyncHandler(async (req, res) => {
  const { user_email } = req.params;

  //role_id is exits not in our not
  try {
    const userEmail = await user.findOne({ where: { user_email: user_email } });
    console.log({ userEmail });
    if (!userEmail) {
      return res.status(404).json({ message: "Oops ! Email id is not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "oops ! some error found while finding the Email id" });
  }

  // All updated data
  const userData = {
    user_email: req.body.user_email,
    RoleRoleId: req.body.RoleRoleId,
  };

  // Update User
  try {
    await user.update(userData, { where: { user_email } });
    return res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    console.log(error);
    throw new Error("Some error is Found while update the user");
  }
});

//@DESC - Update user | @Route - /user/:email | @Access - Private
const deleteUser = asyncHandler(async (req, res) => {
  const { user_email } = req.params;

  //role_id is exits not in our not
  try {
    const userEmail = await user.findOne({ where: { user_email: user_email } });
    if (!userEmail) {
      return res.status(404).json({ message: "Oops ! Email id is not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "oops ! some error found while finding the Email id" });
  }

  try {
    await user.destroy({ where: { user_email } });
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    console.log(error);
    throw new Error("Some error is Found while Delete the user");
  }
});

module.exports = { getUsers, addUser, updateUser, deleteUser, addPermission };

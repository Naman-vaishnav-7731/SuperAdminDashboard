const asyncHandler = require("express-async-handler");
const db = require("../models");
const user = db.user;
const role = db.role;
const Rule = db.rule;
const Permission = db.permission;
const Permission_Rule = db.Permission_Rule;
const User_Permission = db.User_Permission;
const brcypt = require("bcrypt");

// @DESC - Get all Users | @Route - /user | @Access - Private Only Super Admin
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await user.findAll();
    const AllUsers = [];

    for (let ele of users) {
      let obj = {};
      obj.user = await user.findOne({ where: { user_email: ele.user_email } });

      const userPermission = await User_Permission.findAll({
        where: { userUserEmail: obj.user.user_email },
      });

      obj.AllPermissions = [];
      for (let element of userPermission) {
        console.log(element.PermissionRuleId);
        const obj2 = {};
        const permission = await Permission_Rule.findAll({
          where: { id: element.PermissionRuleId },
        });

        // Fetch all Rules Accosicated With Permissions
        for(let ele of permission){
          obj2.rule = await Rule.findAll({where:{Rule_id:ele.RuleRuleId}});
        }

        // Fetch ALl Permission Accoisted with Permissions
        for(let ele of permission){
          obj2.Permissions = await Permission.findAll({where:{Permission_code:ele.PermissionPermissionCode}});
        }

        
        obj.AllPermissions.push(obj2);
      }

      AllUsers.push(obj);
    }

    res.status(200).json(AllUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
});

// @DESC - Add user | @Route - /user | @Access - Private
const addUser = asyncHandler(async (req, res) => {
  const { user_email, password, RoleRoleName, checked } = req.body;
  console.log(checked);

  // check user_email is already exits or not
  try {
    const userExits = await user.findOne({ where: { user_email: user_email } });
    if (userExits) {
      return res.status(400).json({ message: "Oops ! User is Already Exits" });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Some error is occur while finding the user email");
  }

  const hasedPassword = await brcypt.hash(password, 10);
  const users = {
    user_email,
    RoleRoleName,
    password: hasedPassword,
  };

  // add user
  try {
    const adduser = await user.create(users);

    if (adduser) {
      res.status(200).json({ message: "Sucessfully Add User" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Some error Found while Adding the user" });
  }

  // Split array
  let userPermission = [];
  for (let element of checked) {
    let obj = {};
    obj.permission_code = element.split("-")[1];
    obj.Rule_id = element.split("-")[0];
    userPermission.push(obj);
  }
  console.log(userPermission);

  userPermission.map(async (element) => {
    // Find user
    const userRecord = await user.findOne({
      where: { user_email },
    });

    const Permission_Rule_Record = await Permission_Rule.findOne({
      where: {
        PermissionPermissionCode: element.permission_code,
        RuleRuleId: element.Rule_id,
      },
    });

    // add Permission to User
    await Permission_Rule_Record.addUser(userRecord);
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

module.exports = { getUsers, addUser, updateUser, deleteUser };

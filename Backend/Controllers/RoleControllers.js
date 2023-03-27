const asyncHandler = require("express-async-handler");
const db = require("../models");
const Role = db.role;

// @DESC - Get all Roles | @Route - /role/ | @Access - Private Only Super Admin
const getRoles = asyncHandler(async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ err: error, message: "Some error occur while get the roles" });
  }
});

// @DESC - Add Roles | @Route - /role/addrole | @Access - Private
const addRole = asyncHandler(async (req, res) => {
  const { Role_name } = req.body;

  // If Role is already Exits
  const roleExits = await Role.findOne({ where: { Role_name: Role_name } });
  if (roleExits) {
    return res
      .status(400)
      .json({ message: "oops ! Sir Role is Already Exits" });
  }

  try {
    const role = await Role.create({
      Role_name,
    });

    if (role) {
      res.status(200).json({ message: "Sucessfully Added Role" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Some errors is occur While adding the role" });
  }
});

//@DESC - Update Roles | @Route - /role/:roleid | @Access - Private
const updateRole = asyncHandler(async (req, res) => {
  const { Role_id } = req.params;
  console.log(Role_id);
  //role_id is exits not in our not
  try {
    const roleid = await Role.findOne({ where: { Role_id: Role_id } });
    if (!roleid) {
      return res.status(404).json({ message: "Oops ! role id is not found" });
    }

    if (roleid.Role_name == req.body.Role_name) {
      return res.status(400).json({ message: "Role is already Exits" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "oops ! some error found while finding the role id" });
  }

  // All updated data
  const roles = {
    Role_id: req.body.Role_id,
    Role_name: req.body.Role_name,
  };

  // Update Roles
  try {
    await Role.update(roles, { where: { Role_id } });
    return res.status(200).json({ message: "Successfully Updtaed" });
  } catch (error) {
    console.log(error);
    throw new Error("Some error is Found while update the role");
  }
});

//@DESC - Update Roles | @Route - /role/:roleid | @Access - Private
const deleteRole = asyncHandler(async (req, res) => {
  const { Role_id } = req.params;

  //role_id is exits not in our nor
  try {
    const roleid = await Role.findOne({ where: { Role_id: Role_id } });
    if (!roleid) {
      return res.status(404).json({ message: "Oops ! role id  is not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "oops ! some error found while finding the role id" });
  }

  // Delete the Role
  try {
    await Role.destroy({ where: { Role_id } });
    return res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    console.log(error);
    throw new Error("Some error is Found while Delete the role");
  }
});

module.exports = { getRoles, addRole, updateRole, deleteRole };

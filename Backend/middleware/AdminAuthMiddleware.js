// Verfiy Token
const jwt = require("jsonwebtoken");
const db = require("../models");
const admin = db.admin;
const user = db.user;
const role = db.role;
const Rule = db.rule;
const Permission = db.permission;
const Permission_Rule = db.Permission_Rule;
const User_Permission = db.User_Permission;


const AdminAuth = async (req, res, next) => {

  let Token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token for headers
      Token = req.headers.authorization.split(" ")[1];
      console.log("My token", Token);

      // verfiy the token
      const decode = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
      const email = decode.email;

      // verfiy Email
      const adminEmail = await admin.findOne({ where: { admin_email:email } });
      const userEmail = await user.findOne({where:{user_email:email}});
      if (!adminEmail && !userEmail) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if(userEmail){
        req.authEmail = userEmail.user_email;
      }
      next();
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
};
module.exports = AdminAuth;

// Verify the token
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const db = require('../models');
const Users = db.users;

// Protected routes
const Protect = asyncHandler(async (req, res, next) => {
  let Token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token for headers
      Token = req.headers.authorization.split(" ")[1];
      console.log({Token});

      // verfiy the toke
      const decode = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
      console.log(decode);
      let id = decode.id;
      console.log({id});
        
      // get user from the token
      let userData = await Users.findOne({ where: { id } });
      console.log({userData});
      if(userData.userType == "admin"){
        next();
      }else{
          throw new Error("Not Authorized");
      }
  
    } catch (error) {
        console.log(401);
        console.log({error})
        throw new Error("Not Authorized");
    }
  }

  if(!Token){
    res.status(401);
    throw new Error("Not Autorized & No TOken");
  }
});

module.exports = Protect;

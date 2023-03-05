// Verfiy Token
const jwt = require("jsonwebtoken");

const AdminAuth = (req , res , next) => {
    // read the token form the cookie
    const Token = req.cookies.jwt_Token;
    if(!Token){
        return res.status(401).json({message:"Access Denied No Token Found❌❌"})
    }
    try {
        // verfiy the toke
        const decode = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.status(400).send(error.message);
    }
}
module.exports = AdminAuth;
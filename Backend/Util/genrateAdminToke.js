const jwt = require('jsonwebtoken');

const genreteToken = (email) => {
    return jwt.sign(
        {email},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:'1d'
        }
    );
};

module.exports = genreteToken;  
const jwt = require("jsonwebtoken")
require('dotenv').config();

function tokenGenerator(user_id){
    const payload = {
        userId : user_id
    };
    return jwt.sign(payload, process.env.JWTSECRET, { expiresIn : "1hr" });
} 

const tokenDecoder = token => jwt.decode(token);

module.exports = { tokenGenerator, tokenDecoder };
const jwt = require("jsonwebtoken");
require('dotenv').config();

function signToken(payload) {
  return jwt.sign(payload, process.env.secret_key);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.secret_key);
}

module.exports = { signToken, verifyToken };
 
// console.log(process.env.secret_key);
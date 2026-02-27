const { hashPass, verifyPass } = require("./bcrypt");
const { signToken, verifyToken } = require("./jwt");

module.exports = { hashPass, verifyPass, signToken, verifyToken };

const bcrypt = require("bcrypt");

function hashPass(password) {
  return bcrypt.hashSync(password, 10);
}

function verifyPass(userpw, hashedpw) {
  return bcrypt.compareSync(userpw, hashedpw);
}

module.exports = { hashPass, verifyPass };

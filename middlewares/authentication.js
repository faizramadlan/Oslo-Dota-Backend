const { verifyToken } = require('../helpers/index');
const { User } = require('../models');
const { UnauthorizedError } = require('../helpers/CustomErrors');

async function authentication(req, res, next) {
  let { access_token } = req.headers;
  try {
    if (!access_token) {
      throw new UnauthorizedError('Token not found');
    }
    
    // Verify token and extract payload
    let payload = verifyToken(access_token);
    let { id } = payload; // Fix: Destructure id from payload, not access_token string
    
    let toAuth = await User.findOne({ where: { id } });
    if (!toAuth) {
      throw new UnauthorizedError('User not found or token invalid');
    }

    req.user = {
      id,
      username: toAuth.username,
      email: toAuth.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authentication };

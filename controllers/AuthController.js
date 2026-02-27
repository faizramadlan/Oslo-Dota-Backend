const { User } = require('../models');
const { EmailService } = require('../services/EmailService');
const { verifyPass, signToken } = require('../helpers/index');
const { BadRequestError, UnauthorizedError } = require('../helpers/CustomErrors');

class AuthController {
  static async register(req, res, next) {
    let { email, username, password } = req.body;
    try {
      let newUser = await User.create({ email, username, password });

      // Delegate email sending to service layer (non-blocking)
      EmailService.sendRegistrationEmail(email, username);

      res.status(201).json({
        message: `User with email ${email} has been created`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new BadRequestError('Email and password are required');
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new UnauthorizedError('Invalid email/password');
      }

      const isValidPassword = verifyPass(password, user.password);
      if (!isValidPassword) {
        throw new UnauthorizedError('Invalid email/password');
      }

      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { AuthController };

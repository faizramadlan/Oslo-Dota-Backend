const MiscService = require('../services/MiscService');

class MiscController {
  static async getMemes(req, res, next) {
    try {
      const meme = await MiscService.getRandomMeme();
      res.status(200).json(meme);
    } catch (error) {
      next(error);
    }
  }

  static async getFreebies(req, res, next) {
    try {
      const freebies = await MiscService.getFreebies();
      res.status(200).json(freebies);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { MiscController };

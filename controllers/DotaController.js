const OpenDotaService = require('../services/OpenDotaService');

class DotaController {
  static async getAllHeroes(req, res, next) {
    try {
      const heroes = await OpenDotaService.getHeroes();
      res.status(200).json(heroes);
    } catch (error) {
      next(error);
    }
  }

  static async getHeroById(req, res, next) {
    let { heroname } = req.params;
    try {
      const hero = await OpenDotaService.getHeroByName(heroname);
      res.status(200).json(hero);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { DotaController };

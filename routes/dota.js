const router = require('express').Router();
const { DotaController } = require('../controllers/DotaController');

router.get('/heroes', DotaController.getAllHeroes);
router.get('/heroes/:heroname', DotaController.getHeroById);

module.exports = router;

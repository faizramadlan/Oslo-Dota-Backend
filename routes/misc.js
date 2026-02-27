const router = require('express').Router();
const { MiscController } = require('../controllers/MiscController');
const { authentication } = require('../middlewares/index');

router.get('/memes', MiscController.getMemes);

// Note: The original index.js did not use authentication on /freebies, 
// but counter.js passes the access_token. Let's make it authenticated.
router.use(authentication);
router.get('/freebies', MiscController.getFreebies);

module.exports = router;

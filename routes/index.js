const router = require('express').Router();
const authRouter = require('./auth');
const dotaRouter = require('./dota');
const miscRouter = require('./misc');

router.use('/', authRouter);
router.use('/', dotaRouter);
router.use('/', miscRouter);

module.exports = { router };
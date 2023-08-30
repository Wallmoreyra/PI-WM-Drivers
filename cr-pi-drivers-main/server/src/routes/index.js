const { Router } = require("express");
const getRouter = require('./getRouter');
const postRouter = require('./postRouter');

const router = Router();

router.use('/drivers', getRouter);

router.use('/posts', postRouter);


module.exports = router;

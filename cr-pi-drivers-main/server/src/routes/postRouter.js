const { Router } = require("express");
const {postHandler} = require('../handlers/postHanddler');

const postRouter = Router();


postRouter.post('/', postHandler);

module.exports = postRouter;
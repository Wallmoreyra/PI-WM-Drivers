const { Router } = require("express");
const { postTeamsHandler, getTeamsHandler} = require('../handlers/teamsHandlers')

const teamsRouter = Router();


teamsRouter.get('/', getTeamsHandler);

teamsRouter.post('/', postTeamsHandler)

module.exports = teamsRouter;
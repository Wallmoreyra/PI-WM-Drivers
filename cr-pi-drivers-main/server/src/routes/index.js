const { Router } = require("express");
const driversRouter = require('./driversRouters');
const teamsRouter = require('./teamsRouters')


const router = Router();

router.use('/drivers', driversRouter);

router.use('/teams', teamsRouter);


module.exports = router;

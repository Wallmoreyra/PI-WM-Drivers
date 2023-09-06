const { Router } = require("express");
const {getDriversHandler, 
    getDriverIdHandler,
    postDriverHandler
} = require('../handlers/driversHandler');

const driversRouter = Router();


driversRouter.get('/', getDriversHandler);

driversRouter.get('/:id', getDriverIdHandler);

driversRouter.post('/', postDriverHandler);

module.exports= driversRouter;
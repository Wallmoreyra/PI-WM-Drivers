const { Router } = require("express");

const {getDetailHandler, 
    getDriversHandler, 
    createDriverHandler
} = require('../handlers/getHanddler');

const userRouter = Router();



userRouter.get('/', getDriversHandler);

userRouter.get('/:id', getDetailHandler);

userRouter.post('/', createDriverHandler );

module.exports = userRouter;
const {Router} = require('express');

const mainRouter = Router();

mainRouter.get('/users', (req, res) => {
    res.status(200).send('aqui estan toso los usuarios');
});

mainRouter.get('/users/:id', (req, res) => {
    res.status(200).send('Detalle de los usuarios');
});

mainRouter.post('/users', (req, res) => {
    res.status(200).send('Crea usuarios');
});

module.export = mainRouter;

//Es muy posible que este archivo sea necesario borrarlo!!!!
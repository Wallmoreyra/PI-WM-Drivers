//
const getDriversHandler = (req, res) => {
    const {name, race} = req.query
    if(name) res.status(200).send(`aqui esta el usuario ${name} de raza: ${race}`)
    res.status(200).send(`Todos los Drivers`);
};



const getDetailHandler = (req, res) => {
    const {id} = req.params

    res.status(200).send(`Detalle de los usuarios ${id}`);
};



const createDriverHandler = (req, res) => {
    const {name,email,username} = req.body;
    res.status(200).send(`Driver ${name} creado con el mail ${email}`);
};

// :id => params
// query ==> ?name=name&raza=raza
// body => info

module.exports = {
    getDetailHandler, 
    getDriversHandler,
    createDriverHandler
}
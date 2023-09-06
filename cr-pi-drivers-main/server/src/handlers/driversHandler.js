const { createDriverDB, getDriverById, getAllDrivers, getDriverByName } = require("../controllers/driversController");


const getDriversHandler = async (req, res) =>{
    const {name } = req.query;

    try{
        if(name){
            const driverByName = await getDriverByName(name)
            res.status(200).json(driverByName);
        }else{
            const response = await getAllDrivers()
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};



const getDriverIdHandler = async (req, res) =>{
    const {id} = req.params;

    const source = isNaN(id) ? "bdd" : "api"
    try{
        const response = await getDriverById(id, source) //no borrar
        
        
        res.status(200).json(response)     //no borrar
    } catch (error) {
        res.status(400).json({error:error.message})
    }

};


const postDriverHandler = async (req, res) =>{
    
    const {name, surname, description, image, nationality, birthdate, team} = req.body;

    try{
        const response = await createDriverDB(name, surname, description, image, nationality, birthdate, team)
        res.status(200).json(response)
    } catch (error){
        res.status(400).json({error:error.message})
    }

};

//  /:id => params
//  query ===> ?name=name
//  body ==> info


module.exports = {
    getDriversHandler,
    getDriverIdHandler,
    postDriverHandler
}
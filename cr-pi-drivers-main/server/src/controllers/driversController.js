const axios = require('axios');
const {teams} = require('../db');
const {drivers} = require('../db');
const {postAllTeams} = require('../controllers/teamsController')
const { Sequelize } = require('sequelize');
const {Op} = require('sequelize');

const createDriverDB = async (name, surname, description, image, nationality, birthdate, team) => {

    const existingDriver = await drivers.findOne({where: {name,surname}});

    if (existingDriver) {
        // Si ya existe un conductor con esos datos, puedes realizar alguna acción o lanzar un error, según tus necesidades.
        throw new Error("Ya existe un conductor con el mismo nombre y apellido.");
    }

    const teamName = team.split(',').map(item => item.trim());
    await postAllTeams(teamName);
    const TeamsDB = await teams.findAll();
   
    const teamMap = new Map(TeamsDB.map(team => [team.name, team]))
    
    const teamsToAdd = teamName.map(teamName => teamMap.get(teamName)).filter(team => team);
    
    const driver = await drivers.create({
        name,
        surname,
        description,
        image,
        nationality,
        birthdate
    });
    
    driver.addTeams(teamsToAdd);
    return driver;
};



const getDriverById = async (id, source) => {

    const driver = source === 'api' 
        ? (await axios.get(`http://localhost:5000/drivers/${id}`))
            .data
         : await getDriverDB(id);   
        
    return driver;
};

const getDriverDB = async (id) => {
    return drivers.findByPk(id, {
        include: {
            model: teams,
            attributes:['name']
        }})
};

// esta funcion la tengo que pasar al utils
const infoCleaner = (arr) => {
    return arr.map((driver) => {
        const arrayImage = driver.image.url;
        const imageDefault = 'https://cdn-7.motorsport.com/images/mgl/68ey3q40/s1200/f1-abu-dhabi-gp-2017-f1-logo.webp';
        const imageDriver = (arrayImage === "" || arrayImage === null) ? imageDefault : arrayImage
        return {
            name:driver.name.forename, 
            surname:driver.name.surname, 
            description:driver.description, 
            image:imageDriver, 
            nationality:driver.nationality, 
            birthdate:driver.dob, 
            team:driver.teams,
            created:false
        }
    })

}


const getAllDrivers = async () => {

    const driversDB = await Drivers.findAll();

    const infoApi = (await axios.get('http://localhost:5000/drivers')).data;

    const driversApi = infoCleaner(infoApi);

    return [...driversDB, ...driversApi];
};

const getDriverByName = async (name) => {
    const infoApi = (await axios.get('http://localhost:5000/drivers')).data;

    const driversApi = infoCleaner(infoApi);

    const driversFiltered = driversApi.filter(driver => driver.name.toLowerCase().includes(name.toLowerCase()));

    const driversDB = await drivers.findAll({where: {
        [Op.or]:[
            {name: {[Op.startsWith]: `%${name}%`}},
        ]
    }})



    return ([...driversFiltered, ...driversDB]).slice(0, 15);
    //codeium
};

module.exports = {createDriverDB, getDriverById, getAllDrivers, getDriverByName}
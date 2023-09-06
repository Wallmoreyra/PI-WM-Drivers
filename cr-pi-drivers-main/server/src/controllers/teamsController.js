const {teams} = require('../db');
const axios = require('axios');
const {drivers} = require('../db');
const { Sequelize } = require('sequelize');

const createTeamDb = async(name, driverId) => {
    const team = await teams.create({name});

    const driver = await drivers.findByPk(driverId);

    await team.addDriver(driver);

    return team;
    
};

const TeamsFiltered = (arr) => {

    //Primer filtro de extraccion de teams de la api
    const ArrayF = arr.map((driver) => {
        return {
            team:driver.teams
        }
    })
    //segundo filtro extraccion objetos vacios o null
    const ArrayF2 =  ArrayF.filter((item) => item.team !== undefined && item.team !== null);
    //tercer y ultimo filtro para sacar los repetidos, y devolver un array con todos los equipos
    const  ArrayF3 = [...new Set(ArrayF2.flatMap(driver => driver.team.split(',').map(component => component.trim())))];

    return ArrayF3;
}

const getAllTeams = async () => {
    
    const TeamsDB = await teams.findAll();
    const DbFiltered = TeamsDB.map(team => team.name);

    const infoApi = (await axios.get('http://localhost:5000/drivers')).data;

    const TeamsApi = TeamsFiltered(infoApi); 

    return [...new Set([...TeamsApi, ...DbFiltered])];
};

const postAllTeams = async (arra) => {

    const TeamsDB = await teams.findAll();
    const DbFiltered = TeamsDB.map(team => team.name);
    arra = arra.filter((valor) => !DbFiltered.includes(valor));
    //console.log(DbFiltered[1]);
    // const TeamsToPush = [...new Set([arra.filter(team => !DbFiltered.includes(team))])];


    for (const teamName of arra) { 

        const team = await teams.create({name: teamName});
      }
    
    return teams;
}


module.exports = {
    createTeamDb, getAllTeams, postAllTeams
}
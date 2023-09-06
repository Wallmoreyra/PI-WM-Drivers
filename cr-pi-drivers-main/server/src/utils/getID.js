/******** Función para obtener los id de los teams *********/

const { Teams } = require("../db");

const getID = async (data) => {
  let teams = [];
  for (let i = 0; i < data.length; i++) {
    teams.push(
      await Teams.findOne({
        where: { name: data[i] }, // En la tabla types busco los tipos de pokemon por id, y regreso solo sus ids en un array
        attributes: ["id"], // Saco el atributo id
      })
    );
  }
  return teams;
};

module.exports = getID;
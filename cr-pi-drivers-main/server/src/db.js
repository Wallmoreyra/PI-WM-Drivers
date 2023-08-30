require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const DriverModel = require('./models/Driver');
const TeamsModel = require('./models/Teams');

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME }`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


DriverModel(sequelize)
TeamsModel(sequelize)

//Consultar la relacion de muchos a muchos porque no creo que este bien!!!
const { Drivers, Teams } = sequelize.models;
Drivers.belongsToMany(Teams, {through: 'driver_teams',timestamps: false});
Teams.belongsToMany(Drivers, {through: 'driver_teams',timestamps: false});

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  Drivers,
  Teams,
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
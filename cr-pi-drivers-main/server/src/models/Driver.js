const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Drivers', {
    id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue:DataTypes.UUIDV4
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false
    },
    surname:{
      type:DataTypes.STRING,
      allowNull:false
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    nationality:{
      type:DataTypes.STRING,
      allowNull:false
    },
    birthdate:{
      type:DataTypes.DATEONLY,
      allowNull:false
    },
  },
    {timestamps: false}
  )
};
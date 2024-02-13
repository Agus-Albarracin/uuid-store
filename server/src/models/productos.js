const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Productos', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio:{
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    talles:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero:{
      type: DataTypes.STRING,
    },
    marca:{
      type: DataTypes.STRING,
    },
    modelo:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {timestamps: false}
  )
};
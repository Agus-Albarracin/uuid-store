const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Carrito', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    total: {
      type: DataTypes.INTEGER,
    },
    estadoDelPedido: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });

};
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Carrito', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idcliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productos:{
       type: DataTypes.ARRAY(DataTypes.JSON),
       allowNull: false,
    },
    cantidades:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    preciosunitarios:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    total:{
      type: DataTypes.INTEGER,
    },
    estadodelpedido:{
      type: DataTypes.STRING,
    },
  }, {timestamps: false}
  )
};
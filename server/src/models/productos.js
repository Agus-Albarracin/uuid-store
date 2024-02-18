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
    modelo:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio:{
       type: DataTypes.INTEGER,
       allowNull: false,
    },
    stock:{
      type: DataTypes.JSON,
      allowNull: false,
    },
    genero:{
      type: DataTypes.STRING,

    },
    marca:{
      type: DataTypes.STRING,
      allowNull: false,

    },
    imagen:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      // allowNull: false, //cuando esten las imagenes lista se debe activar esta columna.
    },
    keyBorradoLogico:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    estado:{ //El estado corresponde a activo o inactivo
    type: DataTypes.BOOLEAN,
    default: true,
    allowNull: false,
    },
  }, {timestamps: false}
  )
};
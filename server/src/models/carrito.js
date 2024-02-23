  const { DataTypes } = require('sequelize');
  // Exportamos una funcion que define el modelo
  // Luego le injectamos la conexion a sequelize.
  module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Carrito', {
      idDeCompra: {
        type: DataTypes.UUID, // Cambia el tipo de datos a UUID
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Establece un valor predeterminado utilizando UUIDV4
      },
      total: {
        type: DataTypes.INTEGER,
      },
      estadoDelPedido: {
        type: DataTypes.STRING,
      },
      email:{
        type: DataTypes.STRING,
        validate: {
          isEmail: true, // Validación de formato de correo electrónico
      }
      },
      productosEnCarrito:{
        type: DataTypes.JSONB(DataTypes.STRING),

      },
      ProductoId: {
        type: DataTypes.JSONB(DataTypes.STRING), // Por ejemplo, aquí establece el tipo de dato como UUID
      }
    }, { timestamps: false });

  };
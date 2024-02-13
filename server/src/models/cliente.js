const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cliente', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        nombre: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Asegura que el correo electrónico sea único
            validate: {
              isEmail: true, // Validación de formato de correo electrónico
            },
          },

          password: {
            type: DataTypes.STRING, 
            allowNull: false,
          },
    }, 
    {timestamps: false}
    )

};
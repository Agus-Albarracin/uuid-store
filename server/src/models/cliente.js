const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Cliente', {

        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        name: {
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
    
          googleId:{
            type: DataTypes.STRING,
            allowNull: false,
          },

          imageUrl:{
            type: DataTypes.STRING,
            allowNull: false

          },
          givenName:{
            type: DataTypes.STRING,
            allowNull: false
          },

          
    }, 
    {timestamps: false}
    )

};
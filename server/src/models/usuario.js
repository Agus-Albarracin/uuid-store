const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Usuario', {

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

        googleId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },

        givenName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        //DATOS DEL CLIENTE PARA COMPLETAR FORMULARIO DEL PERFIL.
        nombre: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        apellido: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        direccion: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        provincia: {
            type: DataTypes.STRING,
            allowNull: true
        },

        localidad: {
            type: DataTypes.STRING,
            allowNull: true
        },

        codigoPostal: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        dni: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        numeroTramite: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        telefono: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        genero: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        notificaciones: { //deberia ser un checkbox que indique que si desea recibir notificaciones de la página.
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        }

    }, { timestamps: false });
};
const { Usuario } = require('../../db');

const getAllUsers = async (req, res) => {
    try {
        let allUser = await Usuario.findAll({attributes: { exclude: ["createdAt", "updatedAt"] }});

        allUser = allUser.map(user => user.get());
        if(allUser.length === 0){ return res.status(404).send("Todavia no se registraron usuarios")}
        return res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getAllUsers};
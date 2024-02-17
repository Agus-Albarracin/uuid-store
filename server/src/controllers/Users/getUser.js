const { Cliente } = require('../../db');

const getAllClient = async (req, res) => {
    try {
        let allClient = await Cliente.findAll({attributes: { exclude: ["createdAt", "updatedAt"] }});

        allClient = allClient.map(produ => produ.get());
        if(allClient.length === 0){ return res.status(404).send("Todavia no se registraron usuarios")}
        return res.status(200).json(allClient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {getAllClient};
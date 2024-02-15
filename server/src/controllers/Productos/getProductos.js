const { Pruductos, Cliente } = require('../../db');

const getProductos = async (req, res) => {
    try {
        let allProdu = await Pruductos.findAll({
            include: Cliente,
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        allProdu = allProdu.map(produ => produ.get());
        return res.status(200).json(allProdu);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = getProductos;

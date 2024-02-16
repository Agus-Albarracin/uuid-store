const { Productos, Cliente } = require('../../db');

const getProductos = async (req, res) => {
    try {
        let allProdu = await Productos.findAll({
            include: [{
                model: Cliente,
                as: 'carrito_clientes' // Alias para la relación de Productos -> carrito_cliente
              }],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        allProdu = allProdu.map(produ => produ.get());
        return res.status(200).json(allProdu);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = getProductos;

const { Productos } = require("../../db");

const deleteProductos = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    await producto.destroy();
    return res
      .status(200)
      .json({ message: "Producto eliminado exitosamente.", producto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el producto." });
  }
};

module.exports = { deleteProductos };

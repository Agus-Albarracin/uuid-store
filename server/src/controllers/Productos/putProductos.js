const { Productos } = require("../../db");

const updateProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, modelo, precio, stock, genero, marca, imagen } = req.body;

    const producto = await Productos.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    producto.nombre = nombre;
    producto.modelo = modelo;
    producto.precio = precio;
    producto.stock = stock;
    producto.genero = genero;
    producto.marca = marca;
    producto.imagen = imagen;

    await producto.save();

    return res
      .status(200)
      .json({ message: "Producto modificado exitosamente.", producto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

module.exports = { updateProductos };

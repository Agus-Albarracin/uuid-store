const { Productos } = require("../../db");

const updateProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, modelo, precio, stock, genero, marca, imagen, comentarios, calificacion} = req.body;
    if (!id) return res.status(400).json('Se necesita un id para poder modificar el producto');

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
    producto.comentarios = comentarios;
    producto.calificacion = calificacion;

    await producto.save();

    return res
      .status(200)
      .json({ message: "Producto modificado exitosamente.", producto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

const borradoLogicoProductos = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const producto = await Productos.findByPk(id);
    if (!producto) { return res.status(404).json({ error: "Producto no encontrado" });}

    producto.estado = estado;
    //el estado corresponde al borrado lógico, en caso de que de que este activo deberia
    //de ser renderizado y en caso de que no, no deberia mostrarlo pero deberia ser renderizado para el admin
    await producto.save();

    return res.status(200).json({ message: "Se ha modificado el estado del producto.", producto });

  } catch (error) {

    console.error(error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};




module.exports = { updateProductos, borradoLogicoProductos };

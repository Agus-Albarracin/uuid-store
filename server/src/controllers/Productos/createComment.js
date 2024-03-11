const { Productos } = require("../../db");

const createComment = async (req, res) => {
  const { id } = req.query;
  const { comentario } = req.body;

  if (!id) return res.status(400).send("No se encontró el producto con este id");

  const producto = await Productos.findByPk(id);

  if (!producto) return res.status(404).send("Producto no encontrado");

  producto.puntuaciones.push(comentario);
  producto.save();

  return res.status(200).send("Comentario publicado exitosamente!");
};

module.exports = { createComment };

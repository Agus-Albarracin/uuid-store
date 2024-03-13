const { Productos } = require("../../db");

const createComment = async (req, res) => {
  const { id } = req.query;
  const { puntuacion, comentario } = req.body;
  const comment = { puntuacion, comentario };

  if (!id) return res.status(400).send("No se encontró el producto con este id");

  const producto = await Productos.findByPk(id);

  if (!producto) return res.status(404).send("Producto no encontrado");

  const puntuaciones = producto.getDataValue('puntuaciones');
  puntuaciones.push(comment); 
  await producto.update({ puntuaciones });
  
  console.log(producto);

  return res.status(200).json(comment);
};

module.exports = { createComment };
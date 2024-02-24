const { Productos, Usuario } = require("../../db");
const { Op } = require("sequelize");

const getProductos = async (req, res) => {
  try {
    let allProdu = await Productos.findAll({
      include: [
        {
          model: Usuario,
          as: "carrito_clientes", // Alias para la relación de Productos -> carrito_cliente
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    allProdu = allProdu.map((produ) => produ.get());
    return res.status(200).json(allProdu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductosON = async (req, res) => {
  try {
    let allProdu = await Productos.findAll({
      where: {
        estado: true,
      },
      include: [
        {
          model: Usuario,
          as: "carrito_clientes", // Alias para la relación de Productos -> carrito_cliente
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    allProdu = allProdu.map((produ) => produ.get());
    return res.status(200).json(allProdu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductosById = async (req, res) => {
  let { id } = req.params;
  try {
    let product = await Productos.findOne({
      where: { id: id },
    });
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductosByName = async (req, res) => {
  try {
    const { nombre } = req.query;
    console.log(nombre);

    if (!nombre) {
      return res.status(400).json("Debes ingresar el nombre de un producto");
    }

    let product = await Productos.findAll({
      where: {
        estado: true,
        nombre: { [Op.iLike]: `%${nombre}%` },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (product.length === 0) {
      return res
        .status(400)
        .json({ message: "No se encontraron productos con ese nombre" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductosFilter = async (req, res) => {
  try {
    const options = {
      where: {},
    };

    //PAGINADO
    const { limit, offset } = req.query;
    if ((limit, offset)) {
      options.limit = limit;
      options.offset = offset;
    }

    //FILTRADO POR PRECIO
    const { precio } = req.query;
    if (precio) {
      options.where.precio = precio;
    }

    //FILTRADO POR RANGO DE PRECIO
    const { priceMin, priceMax } = req.query;

    if ((priceMin, priceMax)) {
      options.where.precio = {
        [Op.gte]: priceMin,
        [Op.lte]: priceMax,
      };
    }

    //FILTRADO POR MARCA
    const { marca } = req.query;

    if (marca) {
      options.where.marca = { [Op.iLike]: `%${marca}%` };
    }

    //FILTRADO POR GENERO
    const { genero } = req.query;

    if (genero) {
      options.where.genero = { [Op.iLike]: `%${genero}%` };
    }

    const products = await Productos.findAll(options);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProductos,
  getProductosById,
  getProductosON,
  getProductosByName,
  getProductosFilter,
};

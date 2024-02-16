const { Productos } = require('./src/db.js'); 
const produDemo = require("./produDemo.js")

const dbRegisterDEMO = async () => {
    
  try {
    const productos = produDemo;
    const mappedProductos = productos.map(producto => {
      return {
        id: producto.id,
        nombre: producto.nombre,
        modelo: producto.modelo,
        precio: producto.precio,
        stock: producto.stock,
        genero: producto.genero,
        marca: producto.marca,
        keyBorradoLogico: producto.keyBorradoLogico
      };
    });

    // Inserta los productos en la base de datos
    await Productos.bulkCreate(mappedProductos);
    console.log('Productos cargados a la base de datos correctamente');
  } catch (error) {
    console.error('Error en la carga de productos:', error);
  }
};

module.exports = dbRegisterDEMO;
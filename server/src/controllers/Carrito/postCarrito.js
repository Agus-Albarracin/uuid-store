const { Carrito, Usuario, Productos } = require("../../db");
const uuid = require('uuid');

const postOrden = async (req, res) => {
    
   const {
       //info del cliente 
      emailStorage, email, nombre, apellido, dni, numeroTramite, telefono, notificaciones, provincia, direccion,
      localidad, codigoPostal, total, estadoDelPedido, metodoDeEnvio,
       
       //info del producto
       productos } = req.body;


    try {
        for (const Allproducto of productos) {
            const producto = await Productos.findByPk(Allproducto.id);
            
            if (!producto) {
                return res.status(400).json({ message: "No se encontró el producto con ID: " + Allproducto.id });
            }
            
            producto.quantitysold = (producto.quantitysold || 0) + 1;
            await producto.save();
        }


        let usuario = await Usuario.findOne({ where: { email: emailStorage} });
        // if (!usuario) {
        //     return res.status(400).json({ message: "Usuario no encontrado" });
        // }
        
        // Crear un nuevo carrito en la base de datos
        const carrito = await Carrito.create({
            idDeCompra: uuid.v4(), // este es el id que se tiene que rastrear
            // email: email,
            productosEnCarrito: productos.map(producto => ({ ["Codigo: "]: producto.codigo})),
            estadoDelPedido: estadoDelPedido,
            total: total,
            ProductoId: productos.map(prod => prod.id),
            UsuarioId: usuario.id,
         });


         const ticketDeCompra = {
                  productos,
                  carrito,
                  usuario: {
                      id: usuario.id,
                      nombre: nombre,
                      apellido: apellido,
                      email: email,
                      dni: dni,
                      telefono: telefono,
                      provincia: provincia,
                      direccion: direccion,
                      localidad: localidad,
                      codigoPostal: codigoPostal,
                      metodoDeEnvio: metodoDeEnvio,
                  }
              };

        return res.status(200).json(ticketDeCompra);
    } catch (error) {
        console.error("Error al crear la orden de compra:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { postOrden };
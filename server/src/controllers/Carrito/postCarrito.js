const { Carrito, Usuario, Productos } = require("../../db");
const uuid = require('uuid');

const postOrden = async (req, res) => {
    
   const {
       //info del cliente 
      emailStorage, email, nombre, apellido, dni, numeroTramite, telefono, genero,
       notificaciones, provincia, direccion, localidad, codigoPostal, total, estadoDelPedido,
       
       //info del producto
       productos } = req.body;


    try {
        // Verificar si el usuario existe en la base de datos
        let usuario = await Usuario.findOne({ where: { email: emailStorage} });
        if (!usuario) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Crear un nuevo carrito en la base de datos
        const carrito = await Carrito.create({
            idDeCompra: uuid.v4(), // Generar un ID único para el carrito
            email: email,
            productosEnCarrito: productos.map(producto => ({ ["Codigo: "]: producto.codigo})),// Suponiendo que productos es un array de objetos con el id del producto
            total: total, 
            estadoDelPedido: estadoDelPedido,
            ProductoId: productos.map(prod => prod.id),
            UsuarioId: usuario.id
         });


         const ticketDeCompra = {
                  carrito,
                  usuario: {
                      id: usuario.id,
                      nombre: usuario.nombre,
                      apellido: usuario.apellido,
                      email: usuario.email,
                      dni: usuario.dni,
                      numeroTramite: usuario.numeroTramite,
                      telefono: usuario.telefono,
                      provincia: usuario.provincia,
                      direccion: usuario.direccion,
                      localidad: usuario.localidad,
                      codigoPostal: usuario.codigoPostal
                  }
              };

        return res.status(201).json(ticketDeCompra);
    } catch (error) {
        console.error("Error al crear la orden de compra:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { postOrden };
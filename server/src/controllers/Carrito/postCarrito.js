const { Carrito, Usuario, Productos } = require("../../db");
const uuid = require("uuid");
const nodemailer = require("nodemailer");

const postOrden = async (req, res) => {
  console.log(req.body);

  const {
    // datos del cliente
    emailStorage,
    email,
    nombre,
    apellido,
    dni,
    telefono,
    // datos de envio
    provincia,
    direccion,
    localidad,
    codigoPostal,
    // productos
    productos,
  } = req.body;

  try {
    let total = 0;

    productos.forEach(async (produ) => {
      let producto = await Productos.findByPk(produ.id);
      producto.quantitysold = (producto.quantitysold || 0) + 1;
      producto.stock[produ.talle] -= 1;
      total += produ.precio;
      await producto.save();
    });

    let usuario = await Usuario.findOne({ where: { email: emailStorage } });

    const carrito = await Carrito.create({
      idDeCompra: uuid.v4(),

      estadoDelPedido: 'pendiente',

      productos,

      total,

      userData: {
        idDelUsuario: usuario.id, //id de la cuenta a la que se atribuye la compra
        //datos que corresponden a la compra (no necesariamente los del usuario)
        nombre,
        apellido,
        dni,
        telefono,
      },

      datosDeEnvio: {
        provincia,
        direccion,
        localidad,
        codigoPostal,
      },
    });

    console.log(usuario.compras);
    console.log(carrito.dataValues);

    usuario.compras = [...usuario.compras, carrito.dataValues];
    await usuario.save();

    // const contenidoCorreo = `
    //   GRACIAS POR SU COMPRA!\n
    //   SE HA CONFIRMADO \n
    //   Y LA ESTAMOS PROCESANDO.\n
    //   \n
    //   Detalles del ticket de compra:
    //   \n
    //   Productos: ${ticketDeCompra.productos.map((produ) => produ.nombre + "")}
    //   Usuario: ${ticketDeCompra.usuario.nombre} ${ticketDeCompra.usuario.apellido}
    //   Email: ${ticketDeCompra.usuario.email}
    //   DNI: ${ticketDeCompra.usuario.dni}
    //   Teléfono: ${ticketDeCompra.usuario.telefono}
    //   Provincia: ${ticketDeCompra.usuario.provincia}
    //   Dirección: ${ticketDeCompra.usuario.direccion}
    //   Localidad: ${ticketDeCompra.usuario.localidad}
    //   Código Postal: ${ticketDeCompra.usuario.codigoPostal}
    //   Método de Envío: ${ticketDeCompra.usuario.metodoDeEnvio}
    //   \n
    //   uuid.
    //   `;

    // enviarCorreo(email, "Gracias por su compra!", contenidoCorreo);

    res.status(200).json(carrito);
  } catch (error) {
    console.error("Error al crear la orden de compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// const postOrden = async (req, res) => {
//   console.log(req.body);

//   const {
//     //info del cliente
//     emailStorage,
//     email,
//     nombre,
//     apellido,
//     dni,
//     numeroTramite,
//     telefono,
//     notificaciones,
//     provincia,
//     direccion,
//     localidad,
//     codigoPostal,
//     total,
//     estadoDelPedido,
//     metodoDeEnvio,

//     //info del producto
//     productos,
//   } = req.body;

//   try {
//     for (const Allproducto of productos) {
//       const producto = await Productos.findByPk(Allproducto.id);

//       if (!producto) {
//         return res
//           .status(400)
//           .json({
//             message: "No se encontró el producto con ID: " + Allproducto.id,
//           });
//       }

// producto.quantitysold = (producto.quantitysold || 0) + 1;
// await producto.save();
//     }

//     let usuario = await Usuario.findOne({ where: { email: emailStorage } });
//     // if (!usuario) {
//     //     return res.status(400).json({ message: "Usuario no encontrado" });
//     // }

//     // Crear un nuevo carrito en la base de datos
//     const carrito = await Carrito.create({
//       idDeCompra: uuid.v4(), // este es el id que se tiene que rastrear
//       // email: email,
//       productosEnCarrito: productos.map((producto) => ({
//         ["Codigo: "]: producto.codigo,
//       })),
//       estadoDelPedido: estadoDelPedido,
//       total: total,
//       ProductoId: productos.map((prod) => prod.id),
//       UsuarioId: usuario.id,
//     });

//     const ticketDeCompra = {
//       productos,
//       carrito,
//       usuario: {
//         id: usuario.id,
//         nombre: nombre,
//         apellido: apellido,
//         email: email,
//         dni: dni,
//         telefono: telefono,
//         provincia: provincia,
//         direccion: direccion,
//         localidad: localidad,
//         codigoPostal: codigoPostal,
//         metodoDeEnvio: metodoDeEnvio,
//       },
//     };

//     const contenidoCorreo = `
//               GRACIAS POR SU COMPRA!\n
//               SE HA CONFIRMADO \n
//               Y LA ESTAMOS PROCESANDO.\n
//               \n
//               Detalles del ticket de compra:
//               \n
//               Productos: ${ticketDeCompra.productos.map(
//                 (produ) => produ.nombre + ""
//               )}
//               Usuario: ${ticketDeCompra.usuario.nombre} ${
//       ticketDeCompra.usuario.apellido
//     }
//               Email: ${ticketDeCompra.usuario.email}
//               DNI: ${ticketDeCompra.usuario.dni}
//               Teléfono: ${ticketDeCompra.usuario.telefono}
//               Provincia: ${ticketDeCompra.usuario.provincia}
//               Dirección: ${ticketDeCompra.usuario.direccion}
//               Localidad: ${ticketDeCompra.usuario.localidad}
//               Código Postal: ${ticketDeCompra.usuario.codigoPostal}
//               Método de Envío: ${ticketDeCompra.usuario.metodoDeEnvio}
//               \n
//               uuid.
//           `;

//     carrito.ticketDeCompra = JSON.stringify(ticketDeCompra);
//     await carrito.save();

//     // Llama a la función enviarCorreo
//     enviarCorreo(email, "Gracias por su compra!", contenidoCorreo);

//     return res.status(200).json(ticketDeCompra);
//   } catch (error) {
//     console.error("Error al crear la orden de compra:", error);
//     res.status(500).json({ message: "Error interno del servidor" });
//   }
// };

//Configuración de admin / transporter
const transporter = nodemailer.createTransport({
  service: "Outlook",
  auth: {
    user: "uuidstore@outlook.com",
    pass: "Henry!123",
  },
});

// Función para enviar el correo electrónico.
function enviarCorreo(destinatario, asunto, mensaje) {
  // Opciones del correo electrónico
  const mailOptions = {
    from: "uuidstore@outlook.com",
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
}

module.exports = { postOrden };

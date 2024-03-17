const { Carrito, Usuario, Productos } = require("../../db");
const uuid = require("uuid");
const nodemailer = require("nodemailer");

const postOrden = async (req, res) => {
  // console.log(req.body);

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
    if (nombre) {
      let total = 0;

      for (const produ of productos) {
        let producto = await Productos.findByPk(produ.id);
        let stock = producto.getDataValue("stock");
        let quantitysold = producto.getDataValue("quantitysold");

        // Construir un objeto que refleje la actualización del stock
        let updatedStock = { ...stock };
        updatedStock[produ.talle] -= produ.cantidad;

        // Contar la cantidad de ventas por productos
        let updateSold = {...quantitysold};
        updateSold[produ.quantitysold] += produ.quantitysold;

        // Actualizar el stock en la base de datos
        await producto.update({ stock: updatedStock });

        total += produ.precio * produ.cantidad;
      }

      let usuario = await Usuario.findOne({ where: { email: emailStorage } });

      const carrito = await Carrito.create({
        idDeCompra: uuid.v4(),
        UsuarioId: usuario.id,

        estadoDelPedido: "pendiente",

        productos,

        total,

        userData: { 
          //datos que corresponden a la compra (no necesariamente los del usuario)
          nombre,
          apellido,
          dni,
          telefono,
          email,
        },

        datosDeEnvio: {
          provincia,
          direccion,
          localidad,
          codigoPostal,
        },
      });

      await usuario.addCompra(carrito);

      const contenidoCorreo = `
        GRACIAS POR SU COMPRA!\n
        SE HA CONFIRMADO \n
        Y LA ESTAMOS PROCESANDO.\n
        \n
        Detalles del ticket de compra:
        \n
        Productos: ${carrito.productos.map((produ) => produ.nombre + "")}
        Usuario: ${carrito.userData.nombre} ${carrito.userData.apellido}
        Email: ${carrito.userData.email}
        DNI: ${carrito.userData.dni}
        Teléfono: ${carrito.userData.telefono}
        Provincia: ${carrito.datosDeEnvio.provincia}
        Dirección: ${carrito.datosDeEnvio.direccion}
        Localidad: ${carrito.datosDeEnvio.localidad}
        Código Postal: ${carrito.datosDeEnvio.codigoPostal}
        \n
        uuid.

        Podes seguir estado de tu compra en el siguiente link: https://uuid-store.vercel.app/success/${
          carrito.idDeCompra
        }
      `;
      //Podes seguir estado de tu compra en el siguiente link: https://uuid-store-production.up.railway.app/success/${carrito.idDeCompra}

      enviarCorreo(email, "Gracias por su compra!", contenidoCorreo);

      res.status(200).json(carrito);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


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

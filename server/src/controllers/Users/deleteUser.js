const { Usuario } = require("../../db");
const nodemailer = require("nodemailer");


const deleteUser = async (req, res) => {
  try {
    const { email } = req.body ;
    if(!email){ return res.status(404).json("Se necesita el email para poder eliminar el usuario.")}
    
    const usuario = await Usuario.findOne({where: {email}});

    if (!usuario) {return res.status(404).json({ message: "Usuario no encontrado." });}
    
    await usuario.destroy();
    enviarCorreo(email, "ESPERO VOLVERTE A VER", "Se elimino con exito tu cuenta.")
    return res.status(200).json({ message: "Usuario eliminado exitosamente.", usuario });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar el usuario." });
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


module.exports = { deleteUser };

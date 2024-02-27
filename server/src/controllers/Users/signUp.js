const { Usuario } = require("../../db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const signUpUser = async (req, res) => {
  const { email, nombre, apellido, password, rPassword } = req.body;

  try {
    if (!email || !nombre || !apellido || !password || !rPassword)
      return res.status(400).send("Faltan ingresar datos.");

    const hash = await bcrypt.hash(password, 10);

    let [user, seCreoUser] = await Usuario.findOrCreate({
      where: { email },
      defaults: {
        nombre,
        apellido,
        email,
        password: hash,
        rPassword: hash,
      },
    });

    if (!seCreoUser) return res.status(400).send("El usuario ya existe.");

    enviarCorreo(
      email,
      "Bienvenido",
      "¡Gracias por autenticarte en nuestro sitio web, esto no ayuda a la protección tuya como de los demás usuarios."
    );

    delete user.dataValues.password;
    delete user.dataValues.rPassword;

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const signUpUserGoogle = async (req, res) => {
  const { email, nombre, googleId, imageUrl, givenName, apellido } = req.body;
  try {
    if (!email || !nombre || !apellido || !googleId || !imageUrl || !givenName)
      return res.status(400).send("Faltan ingresar datos.");

    let [user, seCreoUser] = await Usuario.findOrCreate({
      where: { email },
      defaults: {
        email,
        nombre,
        apellido,
        googleId,
        imageUrl,
        givenName,
      },
    });

    if (!seCreoUser) return res.status(400).send("El usuario ya existe.");

    enviarCorreo(
      email,
      "Bienvenido",
      "¡Gracias por autenticarte en nuestro sitio web, esto no ayuda a la protección tuya como de los demás usuarios."
    );

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
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

module.exports = { signUpUserGoogle, signUpUser };

const { Usuario } = require("../../db");
const nodemailer = require("nodemailer");

const signUpUser = async (req, res) => {
  let email,
    nombre,
    googleId,
    imageUrl,
    givenName,
    apellido,
    password,
    rPassword;

  if (
    req.body.email &&
    req.body.nombre &&
    req.body.apellido &&
    req.body.googleId &&
    req.body.imageUrl &&
    req.body.givenName
  ) {
    ({ email, nombre, apellido, googleId, imageUrl, givenName } = req.body);
  } else if (
    req.body.nombre &&
    req.body.apellido &&
    req.body.email &&
    req.body.password &&
    req.body.rPassword
  ) {
    ({ nombre, apellido, email, password, rPassword } = req.body);
  }

  if (googleId) {
    try {
      if (
        !email ||
        !nombre ||
        !apellido ||
        !googleId ||
        !imageUrl ||
        !givenName
      )
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
      return res.status(500).json({ message: error.message });
    }
  } else if (password) {
    try {
      console.log(req.body);
      if (!nombre || !apellido || !email || !password || !rPassword)
        return res.status(400).send("Faltan ingresar datos.");

      let [user, seCreoUser] = await Usuario.findOrCreate({
        where: { email },
        defaults: {
          nombre,
          apellido,
          email,
          password,
          rPassword,
        },
      });

      if (!seCreoUser) return res.status(400).send("El usuario ya existe.");

      console.log(user);

      enviarCorreo(
        email,
        "Bienvenido",
        "¡Gracias por autenticarte en nuestro sitio web, esto no ayuda a la protección tuya como de los demás usuarios."
      );

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
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

module.exports = { signUpUser };

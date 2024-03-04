const { Usuario } = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.query;

    const user = await Usuario.findOne({ where: { email: email } });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!user || !passwordCorrect) {
      return res.status(400).send("contraseña o usuario inválido");
    }

    const payload = {
      id: user.id,
      username: user.email,
      admin: user.admin,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    res.json({
      ...user.dataValues,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

// logInGoogle tiene que devolver todo.
const loginGoogle = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send("Usuario no encontrado. Por favor, regístrate." );
    }

    const payload = {
      id: user.id,
      username: user.email,
      admin: user.admin,
    };

    const token = jwt.sign(payload, JWT_SECRET); //No estoy seguro de esto, deberia devolverte el toquen?

    res.status(200).json({
      ...user.dataValues, //DataValues devuelve todos los valores del registro del usuario que pases por email!
      token,//Si tiene un token generado te lo envio en el json manquina.
    });
  } catch (error) { 
    
    return res.status(400).send(error.message);
  }
};


module.exports = { login, loginGoogle };
